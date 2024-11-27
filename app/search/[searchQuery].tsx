import React from "react";
import { usePathname, useRouter } from "expo-router";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import productsData from "../../src/components/productsData";

const SearchResults = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Captura o termo de busca diretamente da URL
  const searchQuery = decodeURIComponent(pathname.split("/").pop() || ""); // Pega a última parte da URL

  // Filtra os produtos com base no termo de busca
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultados para "{searchQuery}"</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {/* Imagem e Informações */}
            <View style={styles.productContent}>
              <Image source={{ uri: item.image }} style={styles.productImage} />

              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
            </View>

            {/* Botão de Comprar */}
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => router.push(`/product/${item.id}`)} // Navega para os detalhes do produto
            >
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum produto encontrado para "{searchQuery}".
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E0175",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: "#FF8800",
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#FF8800",
    borderRadius: 5,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchResults;
