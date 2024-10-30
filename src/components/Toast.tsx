import React, { useState } from "react";
import {
    SafeAreaView, View, Text, StyleSheet, StatusBar, Platform, TouchableWithoutFeedback,
    Dimensions, Animated, Easing
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const { width } = Dimensions.get('window');
const Toast = () => {
    const colors = {
        success: '#43D29E',
        warn: '#fd951f',
        error: '#e91e63',
        default: '#3A405B'
    };
    // função original do video
    // const [styleStatusBar, setStyleStatusBar] = useState('dark-content');

    //função corrigida pelo chatgpt
    const [styleStatusBar, setStyleStatusBar] = useState<"default" | "light-content" | "dark-content">('dark-content');
    const pos = new Animated.Value(-(getStatusBarHeight() + 60));

    // função original do video
    // function zIndex(val) {
    //     return Platform.select({
    //         ios: { zIndex: val },
    //         android: { elevation: val },
    //     });
    // }

    //função corrigida pelo chatgpt
    const zIndex = (val: number) => Platform.select({
        ios: { zIndex: val },
        android: { elevation: val },
    });

    return (
        // <View style={{ ...zIndex(100), top: 0 , position: 'absolute'}}>
        // corrigido pelo chatgpt
        <View style={[styles.toastContainer, zIndex(100)]}>
            <StatusBar
                barStyle={styleStatusBar}
                translucent={true}
                backgroundColor={'#FFF'}
            />
            <TouchableWithoutFeedback>
                <Animated.View style={[styles.default, { backgroundColor: 'red', transform: [{ translateY: pos }] }]}>
                    <View style={styles.msgContainer} >
                        <MaterialCommunityIcons name="account" color="#FFF" size={26} />
                        <Text style={styles.txt}>Mensagem</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Toast;

const styles = StyleSheet.create({
    default: {
        position: 'absolute',
        top: 0,
        width,
        paddingHorizontal: 7,
        paddingBottom: 20,
        paddingTop: getStatusBarHeight() + 7,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    toastContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: 'center',
    },

    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },

    txt: {
        color: '#FFF',
        fontSize: 14,
        marginHorizontal: 10
    }
})