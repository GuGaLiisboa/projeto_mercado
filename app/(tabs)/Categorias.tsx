import React from "react";
import { SafeAreaView, Text, FlatList, View, Image, StyleSheet, TouchableOpacity } from "react-native";

// Exemplo de dados de categorias
const categorias = [
  { id: '1', nome: 'Frutas', imagem: 'https://via.placeholder.com/100' },
  { id: '2', nome: 'Verduras', imagem: 'https://via.placeholder.com/100' },
  { id: '3', nome: 'Carnes', imagem: 'https://via.placeholder.com/100' },
  { id: '4', nome: 'Bebidas', imagem: 'https://via.placeholder.com/100' },
  { id: '5', nome: 'Laticínios', imagem: 'https://via.placeholder.com/100' },
];

export default function Categorias() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryContainer} onPress={() => { 
      console.log(`Categoria ${item.nome} selecionada`);
      // Aqui você pode navegar para uma tela de produtos dessa categoria
    }}>
      <Image source={{ uri: item.imagem }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categorias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Exibe as categorias em duas colunas
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E0175',
    marginVertical: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  categoryContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
