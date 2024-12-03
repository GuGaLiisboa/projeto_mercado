import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ref, get, set, update, remove } from "firebase/database";
import { db } from "../scripts/firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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
  const [userAddress, setUserAddress] = useState<string | null>(null);

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

  // Recuperar o UID do usuário
  useEffect(() => {
    const loadUserUid = async () => {
      const uid = await AsyncStorage.getItem("userUid");
      setUserUid(uid);
    };
    loadUserUid();
  }, []);

  // Buscar o endereço do usuário no Firebase
  useEffect(() => {
    if (!userUid) return;

    const fetchUserAddress = async () => {
      try {
        const userRef = ref(db, `user/${userUid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserAddress(userData.endereco || "Endereço não disponível");
        } else {
          setUserAddress("Endereço não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar endereço do usuário:", error);
        setUserAddress("Erro ao carregar endereço");
      }
    };

    fetchUserAddress();
  }, [userUid]);

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
      <FlatList
        data={cartItems.length > 0 ? [{ id: "address", type: "address" }, ...cartItems] : []} // Só exibe o endereço se houver itens no carrinho
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (item.type === "address") {
            // Renderiza a seção de endereço apenas quando há itens no carrinho
            return (
              <View style={styles.container}>
                <Text style={styles.sectionTitle}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#FF8800" /> ENDEREÇO
                </Text>
                <View style={styles.addressSection}>
                  <View style={styles.addressInfo}>
                    <Text style={styles.addressTitle}>Endereço de Entrega</Text>
                    <Text style={styles.addressDetails}>
                      {userAddress || "Carregando endereço..."}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }

          // Renderiza os itens do carrinho
          return (
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
          );
        }}
        ListEmptyComponent={
          // Exibe a mensagem quando o carrinho está vazio
          <Text style={styles.emptyCartText}>Seu carrinho está vazio...</Text>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          {/* Cabeçalho */}
          <View style={styles.summaryHeader}>
            <MaterialCommunityIcons name="file-document-outline" size={24} color="#FF8800" />
            <Text style={styles.summaryTitle}>RESUMO</Text>
          </View>

          {/* Valor dos Produtos */}
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Valor dos Produtos:</Text>
            <Text style={styles.value}>R$ {totalPrice.toFixed(2)}</Text>
          </View>

          {/* Frete */}
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Frete:</Text>
            <Text style={styles.value}>
              R$ {(totalPrice >= FRETE_GRATIS_LIMITE ? 0 : FRETE).toFixed(2)}
            </Text>
          </View>

          {/* Divisor */}
          <View style={styles.divider} />

          {/* Total no Pix */}
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Valor no Pix:</Text>
            <Text style={styles.totalValue}>R$ {totalWithFrete.toFixed(2)}</Text>
          </View>

          {/* Botões */}
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Finalizar Compra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueShoppingButton} onPress={() => router.replace("/Home")}>
              <Text style={styles.continueShoppingText}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: -10,
    flexDirection: "row",
    alignItems: "center",
  },
  addressSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
    borderLeftColor: "#FF8800",
    borderLeftWidth: 5,
    marginHorizontal: -7
  },
  addressInfo: {
    padding: 15,
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addressDetails: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
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
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    color: "#FF8800",
    fontWeight: "600",
    marginBottom: 15,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  checkoutButton: {
    backgroundColor: "#1E0175",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 5,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  continueShoppingButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  continueShoppingText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8800",
  },
});

export default Carrinho;