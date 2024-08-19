import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventControllers.js";
import { validateJwt } from "../middleware/validateJwtMiddleware.js"

const router = express.Router();

router.post("/events", validateJwt, createEvent);
router.put("/events/:id", validateJwt, updateEvent);
router.delete("/events/:id", validateJwt, deleteEvent);
router.get("/events", validateJwt, getEvents);

export default router;
