import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set, get, update, remove } from "firebase/database";
import { db } from "../scripts/firebase-config";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Carrinho = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);

  // Recuperar o UID do usuário
  useEffect(() => {
    const loadUserUid = async () => {
      const uid = await AsyncStorage.getItem("userUid");
      setUserUid(uid);
    };
    loadUserUid();
  }, []);

  // Carregar o carrinho do Firebase
  useEffect(() => {
    if (!userUid) return;

    const loadCart = async () => {
      try {
        const cartRef = ref(db, `user/${userUid}/cart`);
        const snapshot = await get(cartRef);

        if (snapshot.exists()) {
          setCartItems(snapshot.val());
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho do Firebase:", error);
      }
    };

    loadCart();
  }, [userUid]);

  // Atualizar o carrinho no Firebase sempre que ele mudar
  useEffect(() => {
    if (!userUid) return;

    const saveCart = async () => {
      try {
        const cartRef = ref(db, `user/${userUid}/cart`);
        await set(cartRef, cartItems);
      } catch (error) {
        console.error("Erro ao salvar o carrinho no Firebase:", error);
      }
    };

    saveCart();
  }, [cartItems, userUid]);

  const incrementQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, 999) } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio...</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.brandName}>Nome da Marca</Text>
                <Text style={styles.itemName}>{item.name}</Text>

                {/* Título acima do preço */}
                <Text style={styles.subHeading}>Valor Total:</Text>
                <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>

              {/* Botão de remover */}
              <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                <MaterialCommunityIcons name="delete" size={24} color="red" />
              </TouchableOpacity>

              {/* Botões de quantidade */}
              <View style={styles.quantityContainer}>
                <View style={styles.quantityActions}>
                  <TouchableOpacity
                    onPress={() => decrementQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <MaterialCommunityIcons name="minus" size={25} color="#1E0175" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => incrementQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <MaterialCommunityIcons name="plus" size={25} color="#1E0175" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalPrice}>Total: R$ {totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 15,
    resizeMode: "contain",
  },
  itemInfo: {
    flex: 1,
    paddingRight: 50,
  },
  brandName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    marginBottom: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: "#1E0175",
    fontWeight: "bold",
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    position: "absolute",
    bottom: 7,
    right: 7,
    alignItems: "flex-end",
  },
  quantityActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5, // Espaçamento entre título e ações
  },
  quantityButton: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  footer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: "#1E0175",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Carrinho;