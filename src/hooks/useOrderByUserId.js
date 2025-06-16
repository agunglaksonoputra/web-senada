import { useEffect, useState } from "react";
import { getOrdersByUserId } from "../services/ordersService";

export const useOrdersByUserId = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByUserId(userId);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { orders, loading, error };
};
