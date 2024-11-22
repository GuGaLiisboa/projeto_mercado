import { usePathname } from "expo-router";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import productsData from "../../src/components/productsData";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDetail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [isFavorite, setIsFavorite] = useState(false); // Estado para o favorito

  const product = productsData.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Coração de Favorito */}
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => setIsFavorite(!isFavorite)}
      >
        <MaterialCommunityIcons
          name="heart"
          size={30}
          color={isFavorite ? "red" : "white"}
        />
      </TouchableOpacity>

      {/* Imagem do Produto */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Informações do Produto */}
      <View style={styles.productInfo}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{product.name}</Text>

          {/* Seção de Quantidade estilizada */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>6</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.descriptionTitle}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.specificationsTitle}>Especificações</Text>
        <View style={styles.specificationsContainer}>
          <Text style={styles.specificationItem}>Tamanho: NULL</Text>
          <Text style={styles.specificationItem}>Cor: NULL</Text>
          <Text style={styles.specificationItem}>Peso: NULL</Text>
        </View>
      </View>

      {/* Footer fixado sobre a seção */}
      <View style={styles.footer}>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  favoriteIcon: {
    position: "absolute",
    top: 250,
    right: 10,
    zIndex: 10,
     backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 5,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  productInfo: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#1E0175',
    borderRadius: 20
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: 'white'
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E0175",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  specificationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E0175",
    marginVertical: 10,
  },
  specificationsContainer: {
    marginBottom: 20,
  },
  specificationItem: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E0175",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    position: "absolute", // Fixa o footer no final da tela
    bottom: 25, // Espaço seguro no Android
    left: 10,
    right: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  addToCartButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addToCartText: {
    color: "#1E0175",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default ProductDetail;
