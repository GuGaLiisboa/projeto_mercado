import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs screenOptions={{
            headerStyle: { backgroundColor: '#1E0175' }
        }}>
            <Tabs.Screen name="Home" options={{
                headerTitle: 'Home',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                        name="account"
                        color={color}
                        size={32}
                    />
                )
            }} />

            <Tabs.Screen name="categorias" options={{
                headerTitle: 'Categorias',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={32}
                    />
                )
            }} />

            <Tabs.Screen name="favoritos" options={{
                headerTitle: 'Favoritos',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                        name="heart"
                        color={color}
                        size={32}
                    />
                )
            }} />

            {/* FAZER COMO UM TAB E OCULTAR */}
            <Tabs.Screen name="product" options={{
                headerTitle: 'Favoritos',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                        name="heart"
                        color={color}
                        size={32}
                    />
                )
            }} />
        </Tabs>
    );
}
