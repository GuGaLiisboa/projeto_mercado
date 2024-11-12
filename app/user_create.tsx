import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Toast, { ToastHandle } from '../src/components/Toast';
import Input from "@/src/components/Input";
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth, db } from "../scripts/firebase-config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export interface InputHandle {
    focusOnError: () => void;
    resetError: () => void;
}

export default function Index() {
    console.log("user_create.tsx carregado");
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toastRef = useRef<ToastHandle>(null);

    const emailInput = useRef<InputHandle>(null);
    const senhaInput = useRef<InputHandle>(null);
    const nomeInput = useRef<InputHandle>(null);
    const telefoneInput = useRef<InputHandle>(null);
    const enderecoInput = useRef<InputHandle>(null);

    useEffect(() => {
        emailInput.current?.resetError();
    }, [email]);

    useEffect(() => {
        senhaInput.current?.resetError();
    }, [password]);

    function validarCadastro() {
        if (nome === '') {
            toastRef.current?.show({
                message: "Nome inválido!", type: 'error', iconName: 'account'
            });
            return false;
        }
        if (email === '') {
            toastRef.current?.show({
                message: "Email inválido!", type: 'error', iconName: 'email'
            });
            return false;
        }
        if (telefone === '') {
            toastRef.current?.show({
                message: "Telefone inválido!", type: 'error', iconName: 'phone'
            });
            return false;
        }
        if (endereco === '') {
            toastRef.current?.show({
                message: "Endereço inválido!", type: 'error', iconName: 'location'
            });
            return false;
        }
        if (password === '') {
            toastRef.current?.show({
                message: "Senha inválida!", type: 'error', iconName: 'lock'
            });
            return false;
        }
        return true;
    }

    const createUser = () => {
        if (!validarCadastro()) {
            // Se a validação falhar, interrompe a execução aqui
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Salvar dados adicionais no Firebase Realtime Database
                set(ref(db, 'user/' + user.uid), {
                    nome: nome,          // Nome completo
                    email: email,        // Email
                    telefone: telefone,  // Telefone
                    endereco: endereco   // Endereço
                })
                    .then(() => {
                        // Redirecionar para a tela de login ou qualquer outra página
                        router.push('/');
                    })
                    .catch((error) => {
                        console.error("Erro ao salvar dados no Realtime Database:", error);
                        toastRef.current?.show({
                            message: "Erro ao salvar dados!", type: 'error', iconName: 'database'
                        });
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toastRef.current?.show({
                    message: errorMessage, type: 'error', iconName: 'alert'
                });
            });
    };


    return (
        <SafeAreaView style={styles.container}>
            <Toast ref={toastRef} />

            <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logobranco.png')} style={styles.logo} />
            </View>

            <Text style={{ color: '#FFF', fontSize: 30, fontWeight: 'bold', marginHorizontal: 20 }}>Cadastro</Text>

            <Input
                ref={nomeInput}
                iconName={"rename-box"}
                placeholder="Nome completo"
                keyboardType="default"
                value={nome}
                onChangeText={setNome}
            />

            <Input
                ref={telefoneInput}
                iconName={"phone"}
                placeholder="Telefone"
                keyboardType="numeric"
                value={telefone}
                onChangeText={setTelefone}
            />

            <Input
                ref={enderecoInput}
                iconName={"map-marker"}
                placeholder="Endereço"
                keyboardType="default"
                value={endereco}
                onChangeText={setEndereco}
            />

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
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                keyboardType="default"
            />

            <TouchableOpacity onPress={validarCadastro} onPressIn={createUser} style={styles.button}>
                <MaterialCommunityIcons name={"content-save"} size={26} color={"#FFF"} style={styles.iconBtn} />
                <Text style={styles.txtBtn}>Salvar</Text>
            </TouchableOpacity>

            <View style={styles.cadastro}>
                <Text style={styles.txtBtn}>Já possui cadastro?</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Text style={styles.txtCadastro}> ENTRAR</Text>
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
        marginTop: -100
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
