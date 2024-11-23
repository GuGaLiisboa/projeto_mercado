import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handlePress = () => {
    console.log("Navegando com produto:", product); // Para depuração
    router.push(`/product/${product.id}`); // Navegando para /product/[id]
  };


  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
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
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 12,
    color: "#888",
  },
});

export default ProductCard;
