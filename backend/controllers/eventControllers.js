import Event from "../models/Event.js";

export async function createEvent(req, res) {
  const { title, description, date, location } = req.body;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    console.log("Error creating new event", error);
    res.status(500).json({ error: "Error occured while creating a new event" });
  }
}

export async function updateEvent(req, res) {
  const { id } = req.params;
  const { title, description, date, location } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.log("Error updating event", error);
    res.status(500).json({ error: "Error occured while updating the event" });
  }
}

export async function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error deleting event", error);
    res.status(500).json({ error: "Error occured while deleting the event" });
  }
}

export async function getEvents(req, res) {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.log("Error fetching events", error);
    res.status(500).json({ error: "Error occured while fetching events" });
  }
}
