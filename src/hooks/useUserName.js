import { useEffect, useState } from "react";
import { getUserById } from "../services/users";

export const useUserName = (userId) => {
  const [name, setName] = useState("—");

  useEffect(() => {
    if (!userId) return;
    const fetchName = async () => {
      const user = await getUserById(userId);
      setName(user?.name || "—");
    };
    fetchName();
  }, [userId]);

  return name;
};
