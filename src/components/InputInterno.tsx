import React, { forwardRef } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Definindo as props do componente
interface InputProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: string;
  editable?: boolean;
  label: string;  // Agora o 'label' está presente como uma prop
}

// Utilizando forwardRef para que o componente possa receber referências
const Input = forwardRef<TextInput, InputProps>(
  ({ iconName, placeholder, value, onChangeText, secureTextEntry, keyboardType, editable = true, label }, ref) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text> {/* Exibe o rótulo */}
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name={iconName} size={20} color="#333" style={styles.icon} />
          <TextInput
            ref={ref}
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            editable={editable}  // Controla se o input é editável
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
});

export default Input;
