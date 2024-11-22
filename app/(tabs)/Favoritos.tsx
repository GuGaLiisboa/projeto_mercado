import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import productsData from "../../src/components/productsData";

const Favoritos = () => {
  // Estado para armazenar os produtos favoritos, inicialmente com o id 1
  const [favorites, setFavorites] = useState<number[]>([1,2,4,6]);

  // Função para adicionar/remover produtos dos favoritos
  const toggleFavorite = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  // Filtrar produtos favoritos com base no estado
  const favoriteProducts = productsData.filter((item) => favorites.includes(item.id));

  return (
    <View style={styles.container}>

      {favoriteProducts.length === 0 ? (
        <Text style={styles.noFavorites}>Você ainda não tem produtos favoritos.</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>

              {/* Ícone de Favorito */}
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <MaterialCommunityIcons
                  name="heart"
                  size={30}
                  color={favorites.includes(item.id) ? "red" : "gray"}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  noFavorites: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
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
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#666",
  },
  favoriteButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default Favoritos;
