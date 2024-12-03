import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { auth, db } from "../../scripts/firebase-config"; // Importando a configuração do Firebase
import { ref, get } from "firebase/database"; // Importando funções para ler no Realtime Database
import productsData from "../../src/components/productsData"; // Dados dos produtos

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true); // Variável de carregamento

  useEffect(() => {
    const userId = auth.currentUser?.uid; // Obtendo o userUid
    if (userId) {
      const pedidosRef = ref(db, `user/${userId}/pedidos`); // Referência para os pedidos do usuário no Firebase
      get(pedidosRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const pedidosData = snapshot.val();
            const pedidosList = Object.keys(pedidosData).map(key => {
              const pedido = pedidosData[key];
              // Busca o nome do produto dentro de productsData
              const produtosComNomes = pedido.produtos.map(produto => {
                // Busca o produto no productsData usando o id
                const produtoData = productsData.find(p => p.id === produto.id);

                if (!produtoData) {
                  console.log(`Produto com ID ${produto.id} não encontrado.`);
                }

                return {
                  ...produto,
                  name: produtoData ? produtoData.name : "Produto não encontrado",
                  image: produtoData ? produtoData.image : "",
                };
              });

              return {
                id: key,
                ...pedido,
                produtos: produtosComNomes,
              };
            }).sort((a, b) => b.id - a.id);
            setPedidos(pedidosList);
          } else {
            console.log("Nenhum pedido encontrado.");
            Alert.alert("Nenhum pedido encontrado.");
          }
        })
        .catch((error) => {
          console.log("Erro ao buscar pedidos:", error);
          Alert.alert("Erro ao carregar os pedidos.");
        })
        .finally(() => {
          setLoading(false); // Finaliza o carregamento
        });
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <View key={pedido.id} style={styles.pedidoContainer}>
            <Text style={styles.pedidoTitle}>Pedido #{pedido.id}</Text>
            <Text style={styles.pedidoText}>Total: R${pedido.total.toFixed(2)}</Text>
            <Text style={styles.pedidoText}>Forma de pagamento: {pedido.formaPagamento}</Text>
            <Text style={styles.pedidoText}>Data: {new Date(pedido.data).toLocaleDateString()}</Text>

            <View style={styles.produtosContainer}>
              <Text style={styles.pedidoText}>Produtos:</Text>
              {pedido.produtos.map((produto, index) => (
                <View key={index} style={styles.produtoContainer}>
                  {produto.image ? (
                    <Image source={{ uri: produto.image }} style={styles.produtoImage} />
                  ) : (
                    <View style={styles.produtoImageFallback} />
                  )}
                  <View style={styles.produtoInfo}>
                    <Text style={styles.produtoName}>{produto.name}</Text>
                    <View style={styles.produtoDetails}>
                      <Text style={styles.produtoQuantity}>Quantidade: {produto.quantity}</Text>
                      <Text style={styles.produtoPrice}>R${produto.total.toFixed(2)}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noPedidos}>Você ainda não fez nenhum pedido.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  pedidoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  pedidoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  noPedidos: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  produtosContainer: {
    marginTop: 15,
  },
  produtoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  produtoImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "contain"
  },
  produtoImageFallback: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 15,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  produtoDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  produtoQuantity: {
    fontSize: 14,
    color: "#666",
  },
  produtoPrice: {
    fontSize: 14,
    color: "#666",
  },
});
