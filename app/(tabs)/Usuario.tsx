import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth, db } from "../../scripts/firebase-config";
import { get, ref, update } from "firebase/database";
import { signOut } from "firebase/auth";

export default function Usuario() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      get(ref(db, "user/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
          setName(data.nome);
          setPhone(data.telefone);
          setAddress(data.endereco);
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

  const handleSaveChanges = () => {
    const user = auth.currentUser;
    if (user && name && phone && address) {
      const updates = {
        nome: name,
        telefone: phone,
        endereco: address,
      };

      update(ref(db, "user/" + user.uid), updates)
        .then(() => {
          setIsEditing(false);
          console.log("Dados atualizados com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao salvar os dados: ", error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Meu Perfil</Text>

          {/* Exibição dos dados do usuário */}
          {!isEditing ? (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Nome:</Text>
              <Text style={styles.infoValue}>{userData.nome}</Text>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
              <Text style={styles.infoLabel}>Telefone:</Text>
              <Text style={styles.infoValue}>{userData.telefone}</Text>
              <Text style={styles.infoLabel}>Endereço:</Text>
              <Text style={styles.infoValue}>{userData.endereco}</Text>
            </View>
          ) : (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Nome:</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <Text style={styles.infoLabel}>Telefone:</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
              />
              <Text style={styles.infoLabel}>Endereço:</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />
            </View>
          )}

          {/* Botões de edição e logout */}
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialCommunityIcons name="logout" size={24} color="white" />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E0175",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
    lineHeight: 22,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF8800",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5555",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 15,
    width: "80%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 18,
    color: "#1E0175",
    textAlign: "center",
    marginTop: 20,
  },
});
