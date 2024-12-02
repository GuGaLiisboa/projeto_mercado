import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Para o ícone de tag de desconto

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handlePress = () => {
    console.log("Navegando com produto:", product); // Para depuração
    router.push(`/product/${product.id}`); // Navegando para /product/[id]
  };

  // Calcula a porcentagem de desconto, se existir
  const discountPercentage =
    product.originalPrice && product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        discountPercentage ? { borderColor: "#FF8800", borderWidth: 2 } : {},
      ]}
      onPress={handlePress}
    >
      {/* Ícone de Destaque para Desconto */}
      {discountPercentage && (
        <View style={styles.discountTag}>
          <MaterialCommunityIcons name="tag" size={18} color="#fff" />
          <Text style={styles.discountTagText}>Promoção</Text>
        </View>
      )}

      {/* Imagem do Produto */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Nome do Produto */}
      <Text style={styles.name} numberOfLines={3}>
        {product.name}
      </Text>

      {/* Preço com desconto ou sem desconto */}
      {discountPercentage ? (
        <View style={styles.priceContainer}>
          {/* Preço original */}
          <Text style={styles.originalPrice}>R$ {product.originalPrice.toFixed(2)}</Text>

          {/* Preço atual e desconto */}
          <View style={styles.discountRow}>
            <Text style={styles.discountPrice}>R$ {product.price.toFixed(2)}</Text>
            <Text style={styles.discountPercentage}> {discountPercentage}% OFF</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },
  discountTag: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#FF8800",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  discountTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 5,
    color: "#0f0f0f",
    fontFamily: "Roboto",
  },
  priceContainer: {
    alignItems: "flex-start",
    marginTop: 5,
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
    fontSize: 25,
    fontWeight: "600",
    color: "#0f0f0f",
    letterSpacing: -1,
  },
  discountPercentage: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#28a745",
    marginLeft: 3,
  },
  price: {
    fontSize: 25,
    fontWeight: "600",
    color: "#0f0f0f",
    letterSpacing: -1,
  },
});

export default ProductCard;
