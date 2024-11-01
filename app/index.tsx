import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Toast, { ToastHandle } from '../src/components/Toast';
import Input from "@/src/components/Input";

export interface InputHandle {
  focusOnError: () => void;
  resetError: () => void;
}

export default function Index() {
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
        message: "Email inválido!", type: 'error', iconName: 'account'
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

      <Input
        ref={emailInput}
        iconName={"account"}
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
        <Text>Logar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginHorizontal: 130,
    marginTop: 20,
  },
});
