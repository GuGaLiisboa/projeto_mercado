import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, View, Keyboard, StatusBar, Platform } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Toast, { ToastHandle } from '../src/components/Toast';
import Input from "@/src/components/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../scripts/firebase-config";
import { get, ref } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncProductsWithFirebase } from "@/src/components/syncProducts";
import { syncCategoriesWithFirebase } from "@/src/components/syncCategories";

export interface InputHandle {
  focusOnError: () => void;
  resetError: () => void;
}

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toastRef = useRef<ToastHandle>(null);

  const emailInput = useRef<InputHandle>(null);
  const senhaInput = useRef<InputHandle>(null);

  useEffect(() => {
    // Sincronizar produtos ao iniciar o app
    syncProductsWithFirebase();
    syncCategoriesWithFirebase();
  }, []);

  useEffect(() => {
    emailInput.current?.resetError();
  }, [email]);

  useEffect(() => {
    senhaInput.current?.resetError();
  }, [password]);

  function validarLogin() {
    if (email === '') {
      toastRef.current?.show({
        message: "Email inválido!", type: 'error', iconName: 'email'
      });
      emailInput.current?.focusOnError();
      return false;
    }
    if (password === '') {
      toastRef.current?.show({
        message: "Senha Inválida!", type: 'error', iconName: 'lock'
      });
      senhaInput.current?.focusOnError();
      return false;
    }
    return true;
  }

  const login = () => {
    if (!validarLogin()) {
      // Se a validação falhar, interrompe a execução aqui
      return;
    }

    Keyboard.dismiss();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Salvar o UID no AsyncStorage
        await AsyncStorage.setItem("userUid", user.uid);

        // Exibir os dados do usuário no log
        console.log("Dados do usuário logado:", user);
        console.log("UID:", user.uid);
        console.log("Email:", user.email);

        // Buscar dados adicionais do usuário
        get(ref(db, 'user/' + user.uid))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log("Dados do usuário:", snapshot.val());
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar dados do usuário:", error);
          });

        toastRef.current?.show({
          message: "Login realizado com sucesso!",
          type: 'success',
          iconName: 'check-circle'
        });

        setTimeout(() => {
          router.push("Home"); // Redirecionar após o login
        }, 1000); // Ajuste o delay conforme necessário
      })
      .catch((error) => {
        const errorMessage = error.message;
        toastRef.current?.show({
          message: errorMessage,
          type: 'error',
          iconName: 'alert'
        });
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor={'#FFF'} />
      {Platform.OS === "android" && (
        <StatusBar barStyle="light-content" translucent backgroundColor={'#1E0175'} />
      )}

      <Toast ref={toastRef} />

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logobranco.png')} style={styles.logo} />
      </View>

      <Text style={{ color: '#FFF', fontSize: 30, fontWeight: 'bold', marginHorizontal: 20 }}>Login</Text>
      <Input
        ref={emailInput}
        iconName={"email"}
        placeholder="E-mail"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        keyboardType="email-address"
      />

      <Input
        ref={senhaInput}
        iconName={"lock"}
        secureTextEntry
        placeholder="Senha"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
        keyboardType="default"
      />

      <TouchableOpacity onPress={validarLogin} onPressIn={login} style={styles.button}>
        <MaterialCommunityIcons name={"login"} size={26} color={"#FFF"} style={styles.iconBtn} />
        <Text style={styles.txtBtn}>Logar</Text>
      </TouchableOpacity>

      <View style={styles.cadastro}>
        <Text style={styles.txtBtn}>Novo por aqui?</Text>
        <TouchableOpacity onPress={() => router.push('/user_create')}>
          <Text style={styles.txtCadastro}> CADASTRE-SE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1E0175'
  },

  logoContainer: {
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 100,
    marginTop: -150
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FF8800',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20
  },

  iconBtn: {
    marginRight: 5
  },

  txtBtn: {
    color: "#FFF",
    fontSize: 16
  },

  cadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },

  txtCadastro: {
    color: '#FF8800',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});
