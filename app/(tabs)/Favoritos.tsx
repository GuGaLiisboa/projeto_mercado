import { useRouter } from "expo-router"; // Importar useRouter
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { db } from "../../scripts/firebase-config";
import { ref, onValue, remove } from "firebase/database";

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter(); // Inicializar o roteador para navegação

  useEffect(() => {
    const fetchFavorites = async () => {
      const userUid = await AsyncStorage.getItem("userUid");
      if (!userUid) return;

      const favoritesRef = ref(db, `user/${userUid}/favoritos`);
      const unsubscribe = onValue(favoritesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const favoriteList = Object.values(data);
          setFavorites(favoriteList);
        } else {
          setFavorites([]);
        }
      });

      return () => unsubscribe();
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (productId) => {
    const userUid = await AsyncStorage.getItem("userUid");
    if (!userUid) return;

    const favoriteRef = ref(db, `user/${userUid}/favoritos/${productId}`);
    await remove(favoriteRef);
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>Você ainda não tem produtos favoritos.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => router.push(`/product/${item.id}`)} // Navega para a tela do produto
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => removeFavorite(item.id)}
              >
                <MaterialCommunityIcons name="heart" size={30} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
  noFavorites: { fontSize: 18, color: "#666", textAlign: "center", marginTop: 50 },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: { width: 80, height: 80, resizeMode: "contain", borderRadius: 10 },
  productInfo: { flex: 1, marginLeft: 10 },
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  productPrice: { fontSize: 16, color: "#666" },
  favoriteButton: { justifyContent: "center", alignItems: "center", padding: 10 },
});

export default Favoritos;
