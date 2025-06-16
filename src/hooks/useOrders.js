import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdersWithUserNames = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const orderDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const userCache = {};

        const ordersWithNames = await Promise.all(
          orderDocs.map(async (order) => {
            const userId = order.userId;
            let userName = '—';

            if (userId) {
              if (userCache[userId]) {
                userName = userCache[userId];
              } else {
                const userDoc = await getDoc(doc(db, "users", userId));
                if (userDoc.exists()) {
                  userName = userDoc.data().fullName || '—';
                  userCache[userId] = userName;
                }
              }
            }

            return {
              ...order,
              userName
            };
          })
        );

        setOrders(ordersWithNames);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrdersWithUserNames();
  }, []);

  return { orders, loading, error };
};

export default useOrders;
