import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ProductProvider } from "../../src/context/ProductContext"; // Importa o provedor de produtos

export default function Layout() {
  return (
    <ProductProvider> {/* Envolvendo Tabs com o ProductProvider */}
      <Tabs screenOptions={{ headerStyle: { backgroundColor: "#1E0175" } }}>
        {/* Tela Home */}
        <Tabs.Screen
          name="Home"
          options={{
            headerTitle: "Home",
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

        {/* Tela Dinâmica de Produto (oculta na TabBar) */}
        <Tabs.Screen
          name="product/[id]"
          options={{
            headerTitle: "Detalhes do Produto",
            headerTintColor: "white",
            headerTitleAlign: "center",
            tabBarButton: () => null, // Remove completamente o botão
            tabBarStyle: { display: "none" }, // Esconde o espaço da aba
          }}
        />
      </Tabs>
    </ProductProvider>
  );
}
