import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CategoryCard = ({ category, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: category.icon }} style={styles.icon} />
        <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        marginRight: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    name: {
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default CategoryCard;
