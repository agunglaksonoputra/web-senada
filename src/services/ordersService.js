import { db } from "../firebase";
import { collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";

const orderCollection = collection(db, "orders");

export const getAllOrders = async () => {
  try {
    const snapshot = await getDocs(orderCollection);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Gagal mengambil data order:", error.message);
    return [];
  }
};

export const getOrderById = async (orderId) => {
  try {
    const docRef = doc(orderCollection, orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Order tidak ditemukan");
    }
  } catch (error) {
    console.error("Gagal mengambil order:", error.message);
    throw error;
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const q = query(orderCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Gagal mengambil order berdasarkan userId:", error.message);
    return [];
  }
};
