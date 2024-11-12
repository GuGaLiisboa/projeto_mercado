import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyA0EN1oBS2Ll78jq3UPpfMp4pWVtt4H07c",
    authDomain: "projeto-mercado-4bf70.firebaseapp.com",
    databaseURL: "https://projeto-mercado-4bf70-default-rtdb.firebaseio.com",
    projectId: "projeto-mercado-4bf70",
    storageBucket: "projeto-mercado-4bf70.firebasestorage.app",
    messagingSenderId: "68650214254",
    appId: "1:68650214254:web:f89a0ae8563a8d5650d77f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth, db};