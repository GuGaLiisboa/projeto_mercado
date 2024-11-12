import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen options={{headerShown: false}} name="index" />
      <Stack.Screen options={{headerShown: false}} name="user_create" />
      <Stack.Screen options={{headerShown: false}} name="internas" />
    </Stack>
  );
}
