import React, { useState, useImperativeHandle, forwardRef, useRef } from "react";
import {
    View, Text, StyleSheet, StatusBar, Platform, TouchableWithoutFeedback,
    Dimensions, Animated, Easing
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface ToastProps {
    message: string;
    type?: 'success' | 'warn' | 'error' | 'default';
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap; // Tipo para nome de ícone
}

export interface ToastHandle {
    show: () => void;
    hide: () => void;
}

const Toast = forwardRef<ToastHandle, ToastProps>(({ message, type = 'default', iconName }, ref) => {
    const colors = {
        success: '#43D29E',
        warn: '#fd951f',
        error: '#e91e63',
        default: '#3A405B'
    };

    const pos = useRef(new Animated.Value(-(getStatusBarHeight() + 60))).current;
    const [visible, setVisible] = useState(false);
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);

    function show() {
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current); // Cancelar qualquer animação de esconder anterior
        }

        setVisible(true);
        Animated.timing(pos, {
            toValue: 0,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start();

        // Esconder automaticamente após 4 segundos
        hideTimeout.current = setTimeout(() => hide(), 4000);
    }

    function hide() {
        Animated.timing(pos, {
            toValue: -(getStatusBarHeight() + 60),
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => setVisible(false));
    }

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));

    const zIndex = (val: number) => Platform.select({
        ios: { zIndex: val },
        android: { elevation: val },
    });

    if (!visible) return null;

    return (
        <View style={[styles.toastContainer, zIndex(100)]}>
            <StatusBar
                barStyle="light-content"
                translucent={true}
                backgroundColor={'#FFF'}
            />
            <TouchableWithoutFeedback onPress={hide}>
                <Animated.View style={[
                    styles.default,
                    { backgroundColor: colors[type], transform: [{ translateY: pos }] }
                ]}>
                    <View style={styles.msgContainer}>
                        {iconName && (
                            <MaterialCommunityIcons name={iconName} color="#FFF" size={26} />
                        )}
                        <Text style={styles.txt}>{message}</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
});

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
});
