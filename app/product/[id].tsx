import { usePathname } from "expo-router";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import productsData from "../../src/components/productsData";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../scripts/firebase-config";
import { ref, set, get, remove } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false); // Estado para menu oculto
  const [quantity, setQuantity] = useState(1); // Estado para a quantidade do produto

  const product = productsData.find((item) => item.id === Number(id));

  // Filtrar produtos relacionados (excluindo o produto atual)
  const relatedProducts = productsData.filter((item) => item.id !== Number(id));
  const userId = "demoUser";

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const userUid = await AsyncStorage.getItem("userUid"); // Recupera o UID do AsyncStorage
      if (!userUid) return; // Garantir que o UID esteja disponível

      const favoriteRef = ref(db, `user/${userUid}/favoritos/${id}`);
      const snapshot = await get(favoriteRef);
      setIsFavorite(snapshot.exists());
    };

    fetchFavoriteStatus();
  }, [id]);

  const toggleFavorite = async () => {
    const userUid = await AsyncStorage.getItem("userUid");
    if (!userUid) return;

    const favoriteRef = ref(db, `user/${userUid}/favoritos/${id}`);
    if (isFavorite) {
      await remove(favoriteRef);
      setIsFavorite(false);
    } else {
      await set(favoriteRef, {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      });
      setIsFavorite(true);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Produto não encontrado.</Text>
      </View>
    );
  }

  // Função para incrementar a quantidade
  const increment = () => {
    setQuantity(quantity + 1);
  };

  // Função para decrementar a quantidade
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calcular preço total baseado na quantidade
  const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Coração de Favorito */}
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={toggleFavorite}
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
              <TouchableOpacity style={styles.quantityButton} onPress={decrement}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={increment}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mais Informações */}
          <Text style={styles.moreInfoText}>1L </Text>

          {/* Botão para Informações Adicionais */}
          <TouchableOpacity
            style={styles.additionalInfoButton}
            onPress={() => setShowAdditionalInfo(!showAdditionalInfo)}
          >
            <Text style={styles.additionalInfoText}>
              {showAdditionalInfo ? "Ocultar Informações Adicionais" : "Exibir Informações Adicionais"}
            </Text>
            <MaterialCommunityIcons
              name={showAdditionalInfo ? "chevron-up" : "chevron-down"}
              size={20}
              color="#1E0175"
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          {/* Informações adicionais (menu oculto) */}
          {showAdditionalInfo && (
            <View style={styles.additionalInfo}>
              <Text style={styles.descriptionTitle}>Descrição</Text>
              <Text style={styles.description}>{product.description}</Text>

              <Text style={styles.specificationsTitle}>Especificações</Text>
              <View style={styles.specificationsContainer}>
                <Text style={styles.specificationItem}>Tamanho: NULL</Text>
                <Text style={styles.specificationItem}>Cor: NULL</Text>
                <Text style={styles.specificationItem}>Peso: NULL</Text>
              </View>
            </View>
          )}

          {/* Produtos relacionados */}
          <Text style={styles.relatedTitle}>Produtos Relacionados</Text>
          <FlatList
            data={relatedProducts}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.relatedItem}>
                <Image source={{ uri: item.image }} style={styles.relatedImage} />
                <Text style={styles.relatedName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      {/* Footer fixado sobre a seção */}
      <View style={styles.footer}>
        <Text style={styles.price}>R$ {totalPrice.toFixed(2)}</Text>
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
  scrollContainer: {
    paddingBottom: 100, // Garantir que o conteúdo não fique sobre o footer fixo
    flexGrow: 1, // Garantir que o conteúdo ocupe todo o espaço disponível
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
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    flex: 1, // Garantir que o conteúdo ocupe o restante do espaço
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
  moreInfoText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  additionalInfoButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  additionalInfoText: {
    fontSize: 16,
    color: "#1E0175",
    fontWeight: "bold",
  },
  chevronIcon: {
    marginLeft: 10,
  },
  additionalInfo: {
    marginBottom: 20,
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
  relatedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E0175",
    marginVertical: 10,
  },
  relatedItem: {
    marginRight: 10,
    alignItems: "center",
  },
  relatedImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
  },
  relatedName: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E0175",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    position: "absolute",
    bottom: 30,
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
