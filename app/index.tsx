import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

import Input from '../../app_projeto/src/components/Input';
import Toast from '../src/components/Toast'

export default function Index() {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // function logar() {
  //   if(email == ''){
  //     dispatch()
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Toast />
      {/* <View style={styles.logoView}>
        <Image style={styles.logo} resizeMode="contain" source={require("../assets/images/logobranco.png")} />
      </View> */}
      {/* <Input iconName={'account'}
        placeholder="Usuário"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        keyboardType="email-address"
      />

      <Input iconName={'lock'}
        secureTextEntry
        autoCorrect={false}
        placeholder="Senha"
        autoCapitalize="none"
        keyboardType="default"
      /> */}

      <TouchableOpacity>
        <Text>Logar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#1E0175'
  },

  logoView: {
    alignItems: 'center',
    paddingTop: 75
  },

  logo: {
    width: 325
  }
})