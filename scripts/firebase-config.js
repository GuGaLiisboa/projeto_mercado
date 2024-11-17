// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database"

// const firebaseConfig = {
//     apiKey: "AIzaSyA0EN1oBS2Ll78jq3UPpfMp4pWVtt4H07c",
//     authDomain: "projeto-mercado-4bf70.firebaseapp.com",
//     databaseURL: "https://projeto-mercado-4bf70-default-rtdb.firebaseio.com",
//     projectId: "projeto-mercado-4bf70",
//     storageBucket: "projeto-mercado-4bf70.firebasestorage.app",
//     messagingSenderId: "68650214254",
//     appId: "1:68650214254:web:f89a0ae8563a8d5650d77f"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);

// export {auth, db};

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // Usar getAuth para evitar múltiplas inicializações
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0EN1oBS2Ll78jq3UPpfMp4pWVtt4H07c",
    authDomain: "projeto-mercado-4bf70.firebaseapp.com",
    databaseURL: "https://projeto-mercado-4bf70-default-rtdb.firebaseio.com",
    projectId: "projeto-mercado-4bf70",
    storageBucket: "projeto-mercado-4bf70.firebasestorage.app",
    messagingSenderId: "68650214254",
    appId: "1:68650214254:web:f89a0ae8563a8d5650d77f"
};

// Inicialize o Firebase App (somente uma vez)
const app = initializeApp(firebaseConfig);

// Verifica se já existe uma instância de Auth inicializada
let auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
} catch (e) {
    if (e.code === "auth/already-initialized") {
        auth = getAuth(app); // Pega a instância existente
    } else {
        throw e; // Outros erros não previstos
    }
}

// Inicialize o Database
const db = getDatabase(app);

export { auth, db };
