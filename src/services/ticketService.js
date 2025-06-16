import { db } from "../firebase";
import { collection, doc, query, where, getDoc, getDocs, addDoc } from "firebase/firestore";

const ticketCollection = collection(db, "tickets");

export const getTicketsByEventId = async (eventId) => {
  try {
    const q = query(ticketCollection, where("event_id", "==", eventId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Gagal mengambil tiket:", error.message);
    return [];
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const docRef = doc(ticketCollection, ticketId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Gagal mengambil data tiket:", error.message);
    return null;
  }
};

export const createTicket = async (ticketData) => {
  const ticketsRef = collection(db, "tickets");
  const docRef = await addDoc(ticketsRef, {
    ...ticketData,
    quota: Number(ticketData.quota),
    is_active: Boolean(ticketData.is_active),
    is_sold: Boolean(ticketData.is_sold),
    session_start_date: ticketData.session_start_date,
    session_start_time: ticketData.session_start_time,
    session_end_date: ticketData.session_end_date,
    session_end_time: ticketData.session_end_time,
    category: ticketData.category,
    event_id: ticketData.event_id,
  });

  return docRef.id;
};

export const getTicketCategoriesByEventId = async (eventId) => {
  try {
    const q = query(collection(db, "tickets_categories"), where("event_id", "==", eventId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Gagal mengambil kategori tiket:", error);
    throw error;
  }
};
