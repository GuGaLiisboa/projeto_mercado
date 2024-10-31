import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import Toast, { ToastHandle } from '../src/components/Toast';
import Input from "@/src/components/Input";

export default function Index() {
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warn' | 'error' | 'default'>('default');
  const toastRef = useRef<ToastHandle>(null);

  function logar() {
    if (email === '') {
      setToastMessage("Email é obrigatório!");
      setToastType('error'); // Define o tipo como "warn"
      toastRef.current?.show(); // Exibe o Toast
      setTimeout(() => toastRef.current?.hide(), 3000); // Oculta o toast após 3 segundos
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast ref={toastRef} message={toastMessage} type={toastType} />

      <Input
        placeholder="Teste"
        iconName="account"
      />

      <Input
        placeholder="Senha"
        iconName="lock"
        secureTextEntry={true}
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
    marginHorizontal: 130
  },
});
