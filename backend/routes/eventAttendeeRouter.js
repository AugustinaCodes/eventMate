import express from "express";
import { validateJwt } from "../middleware/validateJwtMiddleware.js";
import { createAttendee, deleteAttendee, getAttendeeById, getAttendees, updateAttendee } from "../controllers/eventAttendeeControllers.js";

const router = express.Router();

router.get("/main/attendees", validateJwt, getAttendees);
router.get("/main/attendees/:id", validateJwt, getAttendeeById);
router.post("/main/attendees", validateJwt, createAttendee);
router.put("main/attendees/:id", validateJwt, updateAttendee);
router.delete("/main/attendees:id", validateJwt, deleteAttendee);

export default router;