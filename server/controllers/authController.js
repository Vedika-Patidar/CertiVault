const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    const { name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    console.log("USER EXISTS 👉", userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("HASHED PASSWORD 👉", hashedPassword);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role : "user",
    });

    console.log("USER CREATED 👉", user);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR FULL 👉", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    console.log("LOGIN BODY 👉", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    console.log("FOUND USER 👉", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH 👉", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR 👉", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};


