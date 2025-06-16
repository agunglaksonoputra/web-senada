import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const userCollection = collection(db, "users");

export const getAllUsers = async () => {
    const snapshot = await getDocs(userCollection);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() }));
}

export const getUserById = async (userId) => {
    try {
        const userRef = doc(userCollection, userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Gagal mengambil user:", error.message);
        return null;
    }
};
