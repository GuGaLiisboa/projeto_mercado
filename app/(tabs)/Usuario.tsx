import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../../scripts/firebase-config";
import { get, ref } from "firebase/database";
import { signOut } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Usuario() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      get(ref(db, "user/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("Nenhum dado encontrado para este usuário.");
        }
      });
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout realizado com sucesso");
        router.push("/");
      })
      .catch((error) => {
        console.error("Erro ao realizar logout: ", error);
      });
  };

  const menuItems = [
    { icon: "account", label: "Meus dados", route: "/meus-dados" },
    { icon: "cart", label: "Meus pedidos", route: "/meus-pedidos" },
    { icon: "email", label: "Mensagens", route: "/mensagens" },
    { icon: "heart", label: "Favoritos", route: "/favoritos" },
    { icon: "tag", label: "Descontos", route: "/descontos" },
    { icon: "trash-can", label: "Excluir Conta", route: "/excluir-conta" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: userData?.fotoPerfil || "https://pub-cfffccb2abb548a3ab74ccaf93a42397.r2.dev/catAlimentos.webp",
          }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            Bem-vindo, {userData?.nome || "Usuário"}
          </Text>
          <Text style={styles.emailText}>{userData?.email}</Text>
        </View>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color="#333"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="#FF8800"
            style={styles.menuIcon}
          />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FF8800",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  emailText: {
    fontSize: 14,
    color: "#FFF",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8800",
  },
});
