import React from "react";
import { SafeAreaView, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import categoriesData from "../../src/components/categoriesData";
import { useRouter } from "expo-router";

export default function Categorias() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={() => {
        router.push(`/category/${item.id}`);
        // Aqui você pode navegar para uma tela de produtos dessa categoria
      }}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.arrow}>{">"}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categoriesData} // Usando os dados já existentes
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    marginHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E0175',
    marginVertical: 15,
    textAlign: 'left',
  },
  list: {
    paddingBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 1, // Espaço entre os itens
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '300',
    color: '#333',
    flex: 1, // Ocupa o espaço restante
  },
  arrow: {
    fontSize: 18,
    color: '#1E0175', // Cor da seta
    fontWeight: 'bold',
  },
});
