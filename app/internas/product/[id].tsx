import React from 'react';
import { useRouter, useSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import productsData from '../../../src/components/productsData'; // Caminho para os dados dos produtos

const ProductDetails = () => {
  const { id } = useSearchParams(); // Obtém o ID do produto
  const router = useRouter();

  // Busca o produto correspondente no arquivo productsData
  const product = productsData.find((item) => item.id === id);

  // Caso o produto não seja encontrado
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado!</Text>
        <Button title="Voltar" onPress={() => router.push('/')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      <Button title="Comprar agora" onPress={() => alert("Compra iniciada!")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 16,
  },
});

export default ProductDetails;
