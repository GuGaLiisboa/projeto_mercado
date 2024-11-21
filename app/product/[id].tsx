import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";

const ProductDetail = () => {
  const router = useRouter();
  
  // Verificando se 'product' está sendo passado corretamente
  const { product } = router.state || {}; 

  // Log para verificar se estamos recebendo os dados corretamente
  console.log("Dados do produto:", product);

  // Se o produto não estiver disponível, exibe "Carregando..."
  if (!product) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  price: {
    fontSize: 18,
    color: "#888",
    marginTop: 10,
  },
});

export default ProductDetail;