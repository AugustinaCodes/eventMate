import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAttendees,
  createAttendee,
  deleteAttendee,
  updateAttendee,
} from "../../services/attendeeService";
import { getEvents } from "../../services/eventService";
import styles from "./Attendees.module.scss";

export default function Attendees() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  const queryClient = useQueryClient();

  const {
    data: attendees,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["attendees"],
    queryFn: () => getAttendees(),
  });
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  // Mutations
  const createAttendeeMutation = useMutation({
    mutationFn: createAttendee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendees"] }),
  });

  const updateAttendeeMutation = useMutation({
    mutationFn: ({ id, data }) => updateAttendee(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendees"] }),
  });

  const deleteAttendeeMutation = useMutation({
    mutationFn: (id) => deleteAttendee(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendees"] }),
  });

  const handleAddAttendee = () => {
    createAttendeeMutation.mutate({
      firstName,
      lastName,
      email,
      dateOfBirth,
      event: selectedEvent, // Include the event ID
    });

    // Clear form fields after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setDateOfBirth("");
    setSelectedEvent("");
  };

  if (isLoading) return <div>Loading attendees...</div>;
  if (error) return <div>Error loading attendees</div>;

  return (
    <div className={styles.attendeesContainer}>
      <h2>Event Attendees</h2>
      <div className={styles.addAttendeeForm}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="" disabled>
            Select Event
          </option>
          {events &&
            events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
        </select>
        <button onClick={handleAddAttendee}>Add Attendee</button>
      </div>

      <table className={styles.attendeeTable}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee._id}>
              <td>{attendee.firstName}</td>
              <td>{attendee.lastName}</td>
              <td>{attendee.email}</td>
              <td>{new Date(attendee.dateOfBirth).toLocaleDateString()}</td>
              <td>{attendee.event?.title || "No Event"}</td>
              <td>
                <button
                  onClick={() =>
                    updateAttendeeMutation.mutate({
                      id: attendee._id,
                      data: { firstName: "Updated First Name" }, // Example update
                    })
                  }
                >
                  Update
                </button>
                <button
                  onClick={() => deleteAttendeeMutation.mutate(attendee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
