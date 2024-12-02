import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function Layout() {
    const router = useRouter(); // Para navegação

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: "#1E0175" },
            headerTintColor: 'white'
        }}>
            {/* Tela Dinâmica de Produto (oculta na TabBar) */}
            <Stack.Screen
                name="meus-dados"
                options={{
                    headerTitle: "Meus Dados",
                    headerTintColor: "white",
                    headerTitleAlign: "center",

                    // Botão de voltar (lado esquerdo)
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={35}
                            color="white"
                            style={{ marginLeft: -10 }}
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="meus-pedidos"
                options={{
                    headerTitle: "Meus Pedidos",
                    headerTintColor: "white",
                    headerTitleAlign: "center",

                    // Botão de voltar (lado esquerdo)
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={35}
                            color="white"
                            style={{ marginLeft: -10 }}
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="mensagens"
                options={{
                    headerTitle: "Mensagens",
                    headerTintColor: "white",
                    headerTitleAlign: "center",

                    // Botão de voltar (lado esquerdo)
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={35}
                            color="white"
                            style={{ marginLeft: -10 }}
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="descontos"
                options={{
                    headerTitle: "Ofertas",
                    headerTintColor: "white",
                    headerTitleAlign: "center",

                    // Botão de voltar (lado esquerdo)
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={35}
                            color="white"
                            style={{ marginLeft: -10 }}
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="excluir-conta"
                options={{
                    headerTitle: "Excluir Conta",
                    headerTintColor: "white",
                    headerTitleAlign: "center",

                    // Botão de voltar (lado esquerdo)
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={35}
                            color="white"
                            style={{ marginLeft: -10 }}
                            onPress={() => router.replace('../Usuario')} // Voltar para a tela Usuario
                        />
                    ),
                }}
            />
        </Stack>
    );
}
