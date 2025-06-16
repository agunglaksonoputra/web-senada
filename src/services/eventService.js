import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc
} from "firebase/firestore";

const eventCollection = collection(db, "events");
const kategoriCollection = collection(db, "categories");

export const creatEvent = async(data) => {
    return await addDoc(eventCollection, data);
};

export const getEvent = async() => {
    const snapshot = await getDocs(eventCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() }));
};

export const getEventById = async (id) => {
  try {
    const docRef = doc(eventCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error("Event tidak ditemukan");
    }
  } catch (error) {
    console.error("Gagal mengambil event:", error.message);
    throw error;
  }
};

export const getKategoriEvent = async() => {
  const snapshot = await getDocs(kategoriCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data() }));
};

export const storeEvent = async (formData) => {
  try {
    if (!formData.title || !formData.categoryIds || formData.categoryIds.length === 0) {
      throw new Error("Field wajib (title, categoryIds) harus diisi.");
    }

    const data = {
      title: formData.title,
      description: formData.description || "",
      phone_number: formData.phone_number || "",
      thumbnail: formData.thumbnail || "",
      location: formData.location || "",
      category: formData.categoryIds || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await addDoc(eventCollection, data);

    return {
      success: true,
      message: "Event berhasil disimpan.",
      id: result.id,
    };
  } catch (error) {
    console.error("Gagal menyimpan event:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};
