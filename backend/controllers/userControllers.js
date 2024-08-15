import User from "../models/User.js";

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
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
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

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error logging in user", error);
    res.status(500).json({ message: "Error logging in", error });
  }
}

export async function getUsers(req, res) {
  const users = await User.find();

  res.json(users);
}
