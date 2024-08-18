import express from "express";
import { checkUsernameExists, getUsers, loginUser, registerUser } from "../controllers/userControllers.js";
import { validateJwt } from "../middleware/validateJwtMiddleware.js";
import { validateUser } from "../middleware/userMiddleware.js"

const router = express.Router();

router.post("/register", validateUser, registerUser)
router.post("/login", loginUser);
router.get("/users", validateJwt, getUsers);
router.get("/users/check-username/:username", checkUsernameExists)

export default router;