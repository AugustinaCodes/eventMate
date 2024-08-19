import EventAttendee from "../models/EventAttendee.js";
import Event from "../models/Event.js";

export async function createAttendee(req, res) {
  const { firstName, lastName, email, dateOfBirth, event } = req.body;

  if (!firstName || !lastName || !email || !dateOfBirth || !event) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const eventExists = await Event.findById(event);
  if (!eventExists) {
    return res.status(404).json({ message: "Event not found" });
  }

  try {
    const newAttendee = new EventAttendee({
      firstName,
      lastName,
      email,
      dateOfBirth,
      event,
    });
    await newAttendee.save();
    res
      .status(201)
      .json({ message: "Attendee created successfully", newAttendee });
  } catch (error) {
    console.log("Error creating new attendee", error);
    res
      .status(500)
      .json({ error: "Error occured while creating a new attendee" });
  }
}

export async function getAttendeeById(req, res) {
  const { id } = req.params;

  try {
    const attendee = await EventAttendee.findById(id).populate("event");
    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }
    res.status(200).json(attendee);
  } catch (error) {
    console.log("Error fetching an attendee", error);
    res.status(500).json({ error: "Error occured while fetching an attendee" });
  }
}

export async function getAttendees(req, res) {
  try {
    const attendees = await EventAttendee.find().populate("event");
    res.status(200).json(attendees);
  } catch (error) {
    console.log("Error fetching attendees", error);
    res.status(500).json({ error: "Error occured while fetching attendees" });
  }
}

export async function updateAttendee(req, res) {
  const { id } = req.params;
  const { firstName, lastName, dateOfBirth, email } = req.body;

  try {
    const attendee = await EventAttendee.findByIdAndUpdate(id);
    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    attendee.firstName = firstName;
    attendee.lastName = lastName;
    attendee.dateOfBirth = dateOfBirth;
    attendee.email = email;

    await attendee.save();

    res.status(200).json({ message: "Attendee updated successfully", attendee });
  } catch (error) {
    console.log("Error updating attendee", error);
    res
      .status(500)
      .json({ error: "Error occured while updating the attendee" });
  }
}

export async function deleteAttendee(req, res) {
  const { id } = req.params;

  try {
    const deletedAttendee = await EventAttendee.findByIdAndDelete(id);
    if (!deletedAttendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }
    res.status(200).json({ message: "Attendee deleted successfully" });
  } catch (error) {
    console.log("Error deleting attendee", error);
    res
      .status(500)
      .json({ error: "Error occured while deleting the attendee" });
  }
}
