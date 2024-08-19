import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/eventService";
import styles from "./Events.module.scss";

export default function Events() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      resetForm();
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setEditingEvent(null);
      resetForm();
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      updateEventMutation.mutate({
        id: editingEvent._id,
        data: { title, description, date, location },
      });
    } else {
      createEventMutation.mutate({ title, description, date, location });
    }
  };

  function resetForm() {
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
  }

  function formatDateForInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events</div>;
  return (
    <div className={styles.eventsContainer}>
      <h2>Events</h2>
      <form onSubmit={handleSubmit} className={styles.eventForm}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">
          {editingEvent ? "Update Event" : "Add Event"}
        </button>
      </form>
      <ul className={styles.eventList}>
        {events.map((event) => (
          <li key={event._id} className={styles.eventItem}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
            <button
              onClick={() => {
                setTitle(event.title);
                setDescription(event.description);
                setDate(formatDateForInput(event.date));
                setLocation(event.location);
                setEditingEvent(event);
              }}
              className={styles.updateButton}
            >
              Edit
            </button>
            <button
              onClick={() => deleteEventMutation.mutate(event._id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
