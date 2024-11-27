import { useRouter } from "expo-router"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { db } from "../../scripts/firebase-config";
import { ref, onValue, remove, get } from "firebase/database";

// Interface explícita para os itens de favoritos
interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Favoritos = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]); // Lista de favoritos com detalhes
  const router = useRouter(); // Inicializar o roteador para navegação

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userUid = await AsyncStorage.getItem("userUid");
        if (!userUid) {
          console.error("Usuário não encontrado.");
          return;
        }
  
        const favoritesRef = ref(db, `user/${userUid}/favoritos`);
        onValue(favoritesRef, async (snapshot) => {
          const data = snapshot.val();
          console.log("Dados de favoritos:", data);
  
          if (data) {
            const favoriteIds = Object.keys(data); // Pega apenas os IDs
            const productDetailsPromises = favoriteIds.map(async (id) => {
              const productRef = ref(db, `products/${id}`);
              const productSnapshot = await get(productRef);
              if (productSnapshot.exists()) {
                return { id, ...productSnapshot.val() }; // Retorna os dados completos
              } else {
                console.warn(`Produto com ID ${id} não encontrado.`);
                return null; // Produto não encontrado
              }
            });
  
            // Aguarda a resolução de todas as promessas
            const productDetails = (await Promise.all(productDetailsPromises)).filter(
              (item) => item !== null
            );
  
            setFavorites(productDetails); // Atualiza os favoritos
            console.log("Produtos favoritos:", productDetails);
          } else {
            setFavorites([]); // Nenhum favorito encontrado
          }
        });
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };
  
    fetchFavorites();
  }, []);

  const removeFavorite = async (productId: number) => {
    const userUid = await AsyncStorage.getItem("userUid");
    if (!userUid) return;

    const favoriteRef = ref(db, `user/${userUid}/favoritos/${productId}`);
    await remove(favoriteRef); // Remover favorito do nó do usuário
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>Você ainda não tem produtos favoritos.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => router.push(`/product/${item.id}`)} // Navega para a tela do produto
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => removeFavorite(item.id)}
              >
                <MaterialCommunityIcons name="heart" size={24} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f8f8f8", 
    padding: 20,
  },
  noFavorites: { 
    fontSize: 18, 
    color: "#666", 
    textAlign: "center", 
    marginTop: 50 
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: { 
    width: 80, 
    height: 80, 
    resizeMode: "contain", 
    borderRadius: 10 
  },
  productInfo: { 
    flex: 1, 
    marginLeft: 10 
  },
  productName: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#333" 
  },
  productPrice: { 
    fontSize: 16, 
    color: "#666",
    marginTop: 10
  },
  favoriteButton: { 
    //justifyContent: "center", 
    left: 13,
    top: -13,
    alignItems: "center", 
    padding: 10 
  },
});

export default Favoritos;
