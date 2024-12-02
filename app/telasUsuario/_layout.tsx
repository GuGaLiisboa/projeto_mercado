import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

export default function Layout() {
    const router = useRouter(); // Para navegação

    return (
        <Tabs screenOptions={{
            headerStyle: { backgroundColor: "#1E0175" },
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor: '#00BCD4',
            tabBarStyle: { backgroundColor: '#1E0175' },
            headerTintColor: 'white'
        }}>
            {/* Tela Dinâmica de Produto (oculta na TabBar) */}
            <Tabs.Screen
                name="meus-dados"
                options={{
                    headerTitle: "Meus Dados",
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
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="meus-pedidos"
                options={{
                    headerTitle: "Meus Pedidos",
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
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="mensagens"
                options={{
                    headerTitle: "Mensagens",
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
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="descontos"
                options={{
                    headerTitle: "Descontos",
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
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="excluir-conta"
                options={{
                    headerTitle: "Excluir Conta",
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
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
