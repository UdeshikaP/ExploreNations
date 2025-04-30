const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const UserModel = require("../models/User");

//get alll users 
// Get all users (Admin only)
router.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      Status: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});


// user registration route
router.post("/register", [
  body("email").isEmail(),
  body("password").isLength({ min: 4 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new UserModel({  email, password: hashedPassword});
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// User Login Route
router.post("/login", [
  body("email").isEmail(),
  body("password").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;

    // Find user
    let user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Send response with message and token
    res.json({ message: "Token generated successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Update a user by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Add a new user
router.post("/add", async (req, res) => {
  try {
    const {  email, password} = req.body;
    const newUser = new UserModel({  email, password});
    const savedUser = await newUser.save();
    res.json({ message: "User added successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});


module.exports = router;
