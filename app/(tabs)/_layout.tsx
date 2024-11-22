import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para armazenar o valor da pesquisa

  return (
    <Tabs screenOptions={{ headerStyle: { backgroundColor: "#1E0175" } }}>
      {/* Tela Home */}
      <Tabs.Screen
        name="Home"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              {/* Campo de Pesquisa com Ícone de Lupa */}
              <View style={styles.searchContainer}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={25}
                  color="gray"
                  style={styles.searchIcon}
                />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Buscar"
                  placeholderTextColor="gray"
                  returnKeyType='search'
                  style={styles.searchInput}
                  onSubmitEditing={() => {
                    console.log("Pesquisa: ", searchQuery); // Ação ao pressionar "Enter" ou "Buscar"
                  }}
                />
              </View>

              {/* Ícone do Carrinho */}
              <MaterialCommunityIcons
                name="cart"
                size={35}
                color="white"
                style={styles.cartIcon}
                onPress={() => {
                  router.push('/Carrinho'); // Navega para o carrinho
                }}
              />
            </View>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={32}
            />
          ),
        }}
      />

      {/* Tela Categorias */}
      <Tabs.Screen
        name="Categorias"
        options={{
          headerTitle: "Categorias",
          headerTintColor: "white",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="menu"
              color={color}
              size={32}
            />
          ),
        }}
      />

      {/* Tela Favoritos */}
      <Tabs.Screen
        name="Favoritos"
        options={{
          headerTitle: "Favoritos",
          headerTintColor: "white",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart"
              color={color}
              size={32}
            />
          ),
        }}
      />

      {/* Tela Usuários */}
      <Tabs.Screen
        name="Usuario"
        options={{
          headerTitle: "Usuários",
          headerTintColor: "white",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={32}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 350,
    height: 35,
    marginBottom: 10
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: "black",
    fontSize: 16,
  },
  cartIcon: {
    marginRight: 0,
    marginLeft: 5,
    marginBottom: 10
  },
});
