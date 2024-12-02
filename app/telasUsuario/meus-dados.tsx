import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../../scripts/firebase-config"; // Importando a configuração do Firebase
import { ref, set, get } from "firebase/database"; // Importando funções para escrever no Realtime Database
import Input from "@/src/components/Input"; // Importando o componente Input
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"; // Importação modular do Firebase

export default function MeusDados() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true); // Variável para controle de carregamento
  const [isChanged, setIsChanged] = useState(false); // Variável para controlar se os dados foram alterados
  const [newPassword, setNewPassword] = useState(''); // Nova senha
  const [currentPassword, setCurrentPassword] = useState(''); // Senha atual
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // Verifica se a senha foi alterada

  const initialState = {
    nome: '',
    telefone: '',
    endereco: '',
    email: ''
  };

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const userRef = ref(db, 'user/' + userId); // Referência do usuário no Realtime Database
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setNome(userData.nome);
            setTelefone(userData.telefone);
            setEndereco(userData.endereco);
            setEmail(userData.email);
          } else {
            console.log("Dados não encontrados");
          }
        })
        .catch((error) => {
          console.log("Erro ao buscar dados do usuário:", error);
        })
        .finally(() => {
          setLoading(false); // Finaliza o carregamento
        });
    }
  }, []);

  // Função para verificar se algum dado foi alterado
  const handleChange = () => {
    if (nome !== initialState.nome || telefone !== initialState.telefone || endereco !== initialState.endereco || email !== initialState.email) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  // Função para salvar os dados no Firebase
  const handleSave = () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      // Referência para o usuário no Firebase
      const userRef = ref(db, 'user/' + userId);
      // Atualiza os dados no Firebase
      set(userRef, {
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        email: email
      })
        .then(() => {
          alert("Dados salvos com sucesso!");
          setIsChanged(false); // Desabilita o botão após salvar
        })
        .catch((error) => {
          console.log("Erro ao salvar dados:", error);
          alert("Erro ao salvar os dados.");
        });
    }
  };

  // Função para alterar a senha
  const handleChangePassword = () => {
    const user = auth.currentUser;
    if (user && currentPassword && newPassword) {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword); // Correção aqui
      reauthenticateWithCredential(user, credential) // Correção do método
        .then(() => {
          updatePassword(user, newPassword) // Correção do método
            .then(() => {
              Alert.alert("Senha alterada com sucesso!");
              setCurrentPassword('');  // Limpa os campos de senha após alteração
              setNewPassword('');
              setIsPasswordChanged(false);  // Desabilita a mudança de senha após sucesso
            })
            .catch((error) => {
              console.error("Erro ao alterar a senha:", error);
              Alert.alert("Erro ao alterar a senha.");
            });
        })
        .catch((error) => {
          console.error("Falha na reautenticação:", error);
          Alert.alert("Senha atual incorreta.");
        });
    } else {
      Alert.alert("Preencha todos os campos de senha.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dados Básicos</Text>

      <Input
        label="Nome"
        iconName="account"
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => { setNome(text); handleChange(); }}
        editable={true} // Torna o nome editável
      />

      <Input
        label="E-mail"
        iconName="email"
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => { setEmail(text); handleChange(); }}
        editable={true} // Torna o e-mail editável
      />

      <Input
        label="Telefone"
        iconName="phone"
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => { setTelefone(text); handleChange(); }}
        editable={true} // Torna o telefone editável
      />

      <Input
        label="Endereço"
        iconName="map-marker"
        placeholder="Endereço"
        value={endereco}
        onChangeText={(text) => { setEndereco(text); handleChange(); }}
        editable={true} // Torna o endereço editável
      />

      {/* Botão de salvar */}
      <TouchableOpacity
        style={[styles.editButton, { opacity: isChanged ? 1 : 0.5 }]} // Desabilita o botão se não houver alterações
        onPress={handleSave}
        disabled={!isChanged} // Desabilita o botão se não houver alterações
      >
        <MaterialCommunityIcons name="content-save" size={20} color="white" />
        <Text style={styles.editText}>Salvar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Alterar Senha</Text>

      {/* Campos para alterar a senha, utilizando o Input */}
      <Input
        label="Senha Atual"
        iconName="lock"
        placeholder="Senha Atual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={true} // Esconde o texto
      />

      <Input
        label="Nova Senha"
        iconName="lock"
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true} // Esconde o texto
      />

      {/* Botão de salvar senha */}
      <TouchableOpacity
        style={[styles.editButton, { opacity: currentPassword && newPassword ? 1 : 0.5 }]} // Torna o botão totalmente opaco quando as senhas estão preenchidas
        onPress={handleChangePassword}
        disabled={!currentPassword || !newPassword} // Desabilita o botão quando um dos campos estiver vazio
      >
        <MaterialCommunityIcons name="lock" size={20} color="white" />
        <Text style={styles.editText}>Alterar Senha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20,
    textAlign: "left",
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 20
  },
  editText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
