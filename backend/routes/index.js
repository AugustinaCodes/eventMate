import express from "express";
import userRouter from "./userRouter.js"
import eventRouter from "./eventRouter.js"
import eventAttendeeRouter from "./eventAttendeeRouter.js"

const router = express.Router();

router.use(userRouter);
router.use(eventRouter);
router.use(eventAttendeeRouter);

export default router;