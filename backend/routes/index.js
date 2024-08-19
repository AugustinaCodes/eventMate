import express from "express";
import userRouter from "./userRouter.js"
import eventRouter from "./eventRouter.js"

const router = express.Router();

router.use(userRouter);
router.use(eventRouter);

export default router;