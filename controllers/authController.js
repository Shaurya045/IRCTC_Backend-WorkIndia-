import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { username, password, role } = req.body;
  // console.log("Registering user:", username);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create(username, hashedPassword, role);
    // console.log("User created with ID:", userId);

    res.status(201).json({ message: "User registered successfully!!", userId });
  } catch (err) {
    res.status(500).json({ message: "Error registering user!!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials!!" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in!!" });
  }
};

export { register, login };
