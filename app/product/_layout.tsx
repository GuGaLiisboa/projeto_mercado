import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

export default function Layout() {
    const router = useRouter(); // Para navegação

    return (
        <Tabs screenOptions={{ headerStyle: { backgroundColor: "#1E0175" } }}>
            {/* Tela Dinâmica de Produto (oculta na TabBar) */}
            <Tabs.Screen
                name="[id]"
                options={{
                    headerTitle: "Detalhes do Produto",
                    headerTintColor: "white",
                    headerTitleAlign: "center",

                    tabBarButton: () => null, // Remove completamente o botão
                    tabBarStyle: { display: "none" }, // Esconde o espaço da aba
                    
                    // Botão de voltar (lado esquerdo)
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={35}
                            color="white"
                            style={{ marginLeft: 5 }}
                            onPress={() => router.back()} // Voltar para a tela anterior
                        />
                    ),

                    //Ícone do carrinho (lado direito)
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="cart"
                            size={35}
                            color="white"
                            style={{ marginRight: 10 }}
                            onPress={() => {
                                console.log("Ícone do carrinho clicado!");
                                router.push('/Carrinho');
                            }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
