import express from "express";
import { getUsers, loginUser, registerUser } from "../controllers/userControllers.js";
import { validateJwt } from "../middleware/validateJwtMiddleware.js";
import { validateUser } from "../middleware/userMiddleware.js"

const router = express.Router();

router.post("/register", validateUser, registerUser)
router.post("/login", loginUser);
router.get("/users", validateJwt, getUsers)

export default router;