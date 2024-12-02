import { useRouter, usePathname } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import productsData from "../../src/components/productsData";
import categoriesData from "../../src/components/categoriesData";

const CategoryDetail = () => {
  const pathname = usePathname();
  const router = useRouter();
  const categoryId = pathname.split("/").pop(); // Obtém o ID da categoria
  const category = categoriesData.find((cat) => cat.id === Number(categoryId)); // Busca a categoria

  // Filtra os produtos que pertencem a esta categoria
  const categoryProducts = productsData.filter((product) => product.categoria === Number(categoryId));

  if (!category) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Categoria não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category.name}</Text>

      <FlatList
        data={categoryProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          // Calcula a porcentagem de desconto, se existir
          const discountPercentage =
            item.originalPrice && item.price
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : null;

          return (
            <View
              style={[
                styles.productItem,
                discountPercentage ? styles.discountedCard : {}, // Aplica borda se for em promoção
              ]}
            >
              {/* Imagem e Informações */}
              <View style={styles.productContent}>
                <Image source={{ uri: item.image }} style={styles.productImage} />

                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>

                  {discountPercentage ? (
                    <View style={styles.priceContainer}>
                      {/* Preço original */}
                      <Text style={styles.originalPrice}>R$ {item.originalPrice.toFixed(2)}</Text>

                      {/* Preço atual e desconto */}
                      <View style={styles.discountRow}>
                        <Text style={styles.discountPrice}>R$ {item.price.toFixed(2)}</Text>
                        <Text style={styles.discountPercentage}>{discountPercentage}% OFF</Text>
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
                  )}
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
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum produto encontrado para esta categoria.
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
    fontSize: 18,
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
  discountedCard: {
    borderWidth: 2,
    borderColor: "#FF8800"
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
    fontWeight: "400",
    color: "#333",
    marginBottom: 10,
    flexWrap: "wrap",
    fontFamily: "Roboto",
  },
  priceContainer: {
    alignItems: "flex-start",
  },
  originalPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -5,
  },
  discountPrice: {
    fontSize: 23,
    fontWeight: "600",
    color: "#0f0f0f",
    marginRight: 5,
    letterSpacing: -1,
  },
  discountPercentage: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#28a745",
  },
  productPrice: {
    fontSize: 23,
    color: "#0f0f0f0",
    fontWeight: "600",
    letterSpacing: -1,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default CategoryDetail;
