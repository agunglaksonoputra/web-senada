import { useState, useEffect } from "react";
import { getEvent } from "../services/eventService";

const useEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvent();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return events;
};

export default useEvents;
