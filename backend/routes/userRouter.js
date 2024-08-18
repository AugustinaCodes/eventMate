import express from "express";
import { getUsers, loginUser, registerUser } from "../controllers/userControllers.js";
import { validateJwt } from "../middleware/validateJwtMiddleware.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser);
router.get("/users", validateJwt, getUsers)

export default router;