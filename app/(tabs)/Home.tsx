import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import ProductCard from "../../src/components/ProductCard"; // Componente de produto
import productsData from "@/src/components/productsData";
import categoriesData from "../../src/components/categoriesData"; // Dados das categorias
import BannerSlider from "../../src/components/BannerSlider"; // Slide de banners
import CategoryCard from "../../src/components/CategoryCard"; // Componente de categorias
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Index({ navigation }) {
    const router = useRouter();

    // Ordenando os produtos pela data de criação (mais recentes primeiro)
    const limitedProducts = productsData
        .sort((a, b) => b.id - a.id)
        .slice(0, 22); // <= Altera a quantidade de produtos na pagina

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Slide de Banner */}
                <BannerSlider />

                {/* Categorias */}
                <View style={styles.section}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.sectionTitle}>Categorias</Text>
                        <TouchableOpacity
                            style={styles.viewAllButton}
                            onPress={() => router.push(`/Categorias`)}
                        >
                            <Text style={styles.viewAllText}>VER TODAS</Text>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={25}
                                color="#007BFF"
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={categoriesData}
                        renderItem={({ item }) => (
                            <CategoryCard
                                category={item}
                                onPress={() => console.log(`Categoria: ${item.name}`)}
                            />
                        )}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />
                </View>

                {/* Produtos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Novos Produtos</Text>
                    <FlatList
                        // data={productsData}
                        data={limitedProducts}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                onPress={() => console.log(`Produto: ${item.name}`)}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.productList}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    section: {
        paddingVertical: 0,
        paddingHorizontal: 10,
        marginTop: 15
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    categoryList: {
        paddingVertical: 0,
    },
    productList: {
        justifyContent: "space-between",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    viewAllButton: {
        flexDirection: "row", 
        alignItems: "center", 
        padding: 5,
    },
    viewAllText: {
        fontSize: 13,
        color: "#007BFF",
        fontWeight: "500",
    },
});
