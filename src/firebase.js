import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyADIC4IXhA4Cg0xbAehNPnhBGIExOfXFg4",

  authDomain: "tb-senada.firebaseapp.com",

  projectId: "tb-senada",

  storageBucket: "tb-senada.firebasestorage.app",

  messagingSenderId: "575637237417",

  appId: "1:575637237417:web:0e836f6140732158f183b8",

  measurementId: "G-29VL3YXL92"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
