import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const CategoryCard = ({ category }) => {
    const router = useRouter();

    const handlePress = () => {
        console.log("Navegando com produto:", category); // Para depuração
        router.push(`/category/${category.id}`); // Navegando para /category/[id]
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={handlePress}
        >
            <View style={styles.content}>
                <Image source={{ uri: category.image }} style={styles.image} />
                <Text style={styles.text}>{category.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 80, // Largura fixa para manter o quadrado
        height: 80, // Altura fixa igual à largura
        borderRadius: 10,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // Sombra no Android
        shadowColor: "#000", // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginHorizontal: 5,
        marginVertical: 10,
    },
    content: {
        alignItems: "center",
    },
    image: {
        width: 40, // Ajuste proporcional
        height: 40,
        resizeMode: "contain",
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        textAlign: "center",
        color: "#333",
    },
});

export default CategoryCard;
