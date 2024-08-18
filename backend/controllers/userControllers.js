import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export async function registerUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.log("Error registering new user", error);
    res
      .status(500)
      .json({ error: "Error occured while registering a new user" });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required"})
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user._id, username: user.username}, secretKey, { expiresIn: "1h"})

    res.json({ token })
  } else {
    res.status(401).json({ message: "Password incorrect"})
  }
}

export async function getUsers(req, res) {
  const users = await User.find();

  res.json(users);
}

export async function checkUsernameExists(req, res) {
  try {
      const { username } = req.params;
      const user = await User.findOne({ username });

      if (user) {
          return res.status(200).json({ exists: true });
      }

      res.status(200).json({ exists: false });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
}
