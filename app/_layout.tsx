import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: "#1E0175" } }}>
      {/* Tela de Login */}
      <Stack.Screen options={{ headerShown: false }} name="index" />

      {/* Tela de Cadastro */}
      <Stack.Screen options={{ headerShown: false }} name="user_create" />

      {/* Tabs (antiga 'internas') */}
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />

      <Stack.Screen options={{ headerShown: false }} name="product" />

      {/* Carrinho de compras */}
      <Stack.Screen name="Carrinho" options={{ 
        headerShown: true,
        headerTitle: "Carrinho",
        headerTintColor: 'white',
        headerBackVisible: false,

        headerLeft: () => (
          <MaterialCommunityIcons
              name="chevron-left"
              size={35}
              color="white"
              style={{ marginLeft: -10 }}
              onPress={() => router.back()} // Voltar para a tela anterior
          />
      ),
       }}/>
    </Stack>
  );
}
