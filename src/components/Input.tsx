import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Input = (props) => {
    const [sec, setSec] = useState(props.secureTextEntry)
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#949494'}
                {...props}
                secureTextEntry={sec}
            />

            <MaterialCommunityIcons
                name={props.iconName}
                size={26}
                color={'#949494'}
                style={styles.icon}
            />

            {props.secureTextEntry && (
                <TouchableOpacity onPress={() => setSec(!sec)}>
                    <Ionicons
                        name={sec ? "eye" : "eye-off"}
                        size={26}
                        color={'#949494'}
                        style={styles.iconeOlho} />
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20
    },

    input: {
        height: 50,
        flex: 1,
        backgroundColor: '#FFF',
        paddingLeft: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        fontSize: 18,
        borderColor: '#949494',
        borderWidth: 1
    },

    icon: {
        position: 'absolute',
        left: 30,
        top: 12
    },

    iconeOlho: {
        position: 'absolute',
        right: 30,
        top: 12
    }
})

export default Input;