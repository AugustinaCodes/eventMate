import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: "eventMate" })
  .then(() => console.log("Connected to MONGO DB"))
  .catch(() => console.log("Failed to connect to MONGO database"));

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
