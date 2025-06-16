import { useEffect, useState } from "react";
import { getOrderById } from "../services/ordersService";
import { getUserById } from "../services/usersService";
import { getTicketById } from "../services/ticketService";

const useOrderById = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderData = await getOrderById(orderId);

        if (!orderData) {
          setOrder(null);
          return;
        }

        const userData = orderData.userId ? await getUserById(orderData.userId) : null;

        const ticketData = orderData.ticketId ? await getTicketById(orderData.ticketId) : null;

        setOrder({
          ...orderData,
          user: userData,
          ticket: ticketData,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
};

export default useOrderById;
