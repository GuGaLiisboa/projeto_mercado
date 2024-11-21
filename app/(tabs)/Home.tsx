import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, FlatList } from "react-native";
import ProductCard from "../../src/components/ProductCard"; // Componente de produto
import productsData from "@/src/components/productsData";
import categoriesData from "../../src/components/categoriesData"; // Dados das categorias
import BannerSlider from "../../src/components/BannerSlider"; // Slide de banners
import CategoryCard from "../../src/components/CategoryCard"; // Componente de categorias

export default function Index({ navigation }) {
    // Obtendo os produtos do contexto

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Slide de Banner */}
                <BannerSlider />

                {/* Categorias */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categorias</Text>
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
                    <Text style={styles.sectionTitle}>Mais Vendidos</Text>
                    <FlatList
                        data={productsData}
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
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    categoryList: {
        paddingVertical: 5,
    },
    productList: {
        justifyContent: "space-between",
    },
});
