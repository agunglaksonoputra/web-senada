import { useState, useEffect } from "react";
import { getAllUsers } from "../services/usersService";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };

    fetchEvents();
  }, []);

  return users;
};

export default useUsers;
