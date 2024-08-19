import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventControllers.js";
import { validateJwt } from "../middleware/validateJwtMiddleware.js"

const router = express.Router();

router.post("/main/events", validateJwt, createEvent);
router.put("/main/events/:id", validateJwt, updateEvent);
router.delete("/main/events/:id", validateJwt, deleteEvent);
router.get("/main/events", validateJwt, getEvents);

export default router;
