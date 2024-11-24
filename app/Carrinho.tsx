import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ref, get, set, update, remove } from "firebase/database";
import { db } from "../scripts/firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  marca: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

const Carrinho = () => {
  const [cartItems, setCartItems] = useState<(CartItem & Product)[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);

  const FRETE = 5;
  const FRETE_GRATIS_LIMITE = 100;

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
        const productsRef = ref(db, `products`);
        const cartSnapshot = await get(cartRef);
        const productsSnapshot = await get(productsRef);

        if (cartSnapshot.exists() && productsSnapshot.exists()) {
          const cart: CartItem[] = cartSnapshot.val();
          const products: Record<string, Product> = productsSnapshot.val();

          // Mapear os IDs do carrinho para os produtos completos
          const fullCart = cart.map((item) => ({
            ...item,
            ...products[item.id], // Mesclar os dados do produto com a quantidade
          }));
          setCartItems(fullCart);
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
        const cartToSave = cartItems.map(({ id, quantity }) => ({ id, quantity }));
        await set(cartRef, cartToSave);
      } catch (error) {
        console.error("Erro ao salvar o carrinho no Firebase:", error);
      }
    };

    saveCart();
  }, [cartItems, userUid]);

  // Funções de manipulação do carrinho
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

  // Cálculo do total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const freteMessage = totalPrice >= FRETE_GRATIS_LIMITE ? "Frete Grátis!" : `Frete: R$ ${FRETE.toFixed(2)}`;
  const totalWithFrete = totalPrice >= FRETE_GRATIS_LIMITE ? totalPrice : totalPrice + FRETE;

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
              <Text style={styles.brandName}>{item.marca || "Marca não disponível"}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.subHeading}>Valor Total:</Text>
                <Text style={styles.itemPrice}>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                <MaterialCommunityIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
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
          <Text style={styles.totalItems}>Itens no carrinho: {cartItems.length}</Text>
          <Text style={styles.totalPrice}>Total: R$ {totalWithFrete.toFixed(2)}</Text>
          <Text style={[styles.incentiveText, { color: totalPrice >= FRETE_GRATIS_LIMITE ? "#1E0175" : "#888" }]}>
            {freteMessage}
          </Text>
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Finalizar Compra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueShoppingButton}>
              <Text style={styles.continueShoppingText}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 5,
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
  totalItems: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  incentiveText: {
    fontSize: 14,
    color: "#1E0175",
    fontWeight: "600",
    marginBottom: 15,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  checkoutButton: {
    backgroundColor: "#1E0175",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  continueShoppingButton: {
    backgroundColor: "#f4f4f4",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    flex: 1,
  },
  continueShoppingText: {
    color: "#1E0175",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Carrinho;