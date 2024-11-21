import { usePathname } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import productsData from "../../src/components/productsData";

const ProductDetail = () => {
  const pathname = usePathname(); // Retorna o caminho completo
  const id = pathname.split("/").pop(); // Extrai o último segmento da URL

  console.log("Acessando produto com ID:", id);

  const product = productsData.find((item) => item.id === Number(id)); // Converte o ID para número

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#888",
    fontWeight: "bold",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});

export default ProductDetail;
