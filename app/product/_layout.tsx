import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs screenOptions={{ headerStyle: { backgroundColor: "red" } }}>
            {/* Tela Dinâmica de Produto (oculta na TabBar) */}
            <Tabs.Screen
                name="[id]"
                options={{
                    headerTitle: "Detalhes do Produto",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    tabBarButton: () => null, // Remove completamente o botão
                    tabBarStyle: { display: "none" }, // Esconde o espaço da aba
                }}
            />

            
        </Tabs>
    );
}