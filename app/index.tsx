import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Toast, { ToastHandle } from '../src/components/Toast';
import Input from "@/src/components/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export interface InputHandle {
  focusOnError: () => void;
  resetError: () => void;
}

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toastRef = useRef<ToastHandle>(null);

  const emailInput = useRef<InputHandle>(null);
  const senhaInput = useRef<InputHandle>(null);

  useEffect(() => {
    emailInput.current?.resetError();
  }, [email]);

  useEffect(() => {
    senhaInput.current?.resetError();
  }, [senha]);

  function logar() {
    if (email === '') {
      toastRef.current?.show({
        message: "Email inválido!", type: 'error', iconName: 'email'
      });
      emailInput.current?.focusOnError();
      return;
    }
    if (senha === '') {
      toastRef.current?.show({
        message: "Senha Inválida!", type: 'error', iconName: 'lock'
      });
      senhaInput.current?.focusOnError();
      return;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
        value={senha}
        onChangeText={setSenha}
        autoCorrect={false}
        keyboardType="default"
      />

      <TouchableOpacity onPress={logar} style={styles.button}>
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
