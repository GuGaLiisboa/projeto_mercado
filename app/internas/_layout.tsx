import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs screenOptions={{
            headerStyle: { backgroundColor: '#1E0175' }
        }}>
            <Tabs.Screen name="home" options={{
                headerTitle: 'Home',
                headerTintColor: 'white',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={32}
                    />
                )
            }} />
        </Tabs>
    );
}
