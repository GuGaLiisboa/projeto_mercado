import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Definindo os props com uma interface
interface InputProps extends TextInputProps {
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap; // Tipagem para `iconName`
    secureTextEntry?: boolean; // Prop opcional
}

interface InputHandle {
    focusOnError: () => void;
    resetError: () => void;
}

const Input = forwardRef<InputHandle, InputProps>(({ iconName, secureTextEntry, ...props }, ref) => {
    const [sec, setSec] = useState(secureTextEntry || false);
    const [error, setError] = useState(false);
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
        focusOnError() {
            setError(true);
            inputRef.current?.focus(); // Acessa `focus()` com o operador opcional `?.`
        },
        resetError() {
            setError(false);
        }
    }));

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { borderColor: error ? "#e91e63" : "#949494" }]}
                ref={inputRef}
                underlineColorAndroid="transparent"
                placeholderTextColor="#949494"
                secureTextEntry={sec}
                {...props}
            />

            {iconName && (
                <MaterialCommunityIcons
                    name={iconName}
                    size={26}
                    color={error ? "#e91e63" : "#444"}
                    style={styles.icon}
                />
            )}

            {secureTextEntry && (
                <TouchableOpacity onPress={() => setSec(!sec)}>
                    <Ionicons
                        name={sec ? "eye" : "eye-off"}
                        size={26}
                        color="#949494"
                        style={styles.iconeOlho}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
    },
    input: {
        height: 50,
        flex: 1,
        backgroundColor: "#FFF",
        paddingLeft: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        fontSize: 18,
        borderWidth: 1,
    },
    icon: {
        position: "absolute",
        left: 30,
        top: 12,
    },
    iconeOlho: {
        position: "absolute",
        right: 30,
        top: 12,
    },
});

export default Input;
