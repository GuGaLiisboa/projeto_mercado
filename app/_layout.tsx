import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tela de Login */}
      <Stack.Screen options={{ headerShown: false }} name="index" />
      
      {/* Tela de Cadastro */}
      <Stack.Screen options={{ headerShown: false }} name="user_create" />
      
      {/* Tabs (antiga 'internas') */}
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />

      <Stack.Screen options={{ headerShown: false }} name="product" />
    </Stack>
  );
}
