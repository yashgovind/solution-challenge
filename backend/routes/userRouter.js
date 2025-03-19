const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { fullname, email, password, isAdmin, googleId, geminiId, subjects, topics, avatar, ttsVoice, avatarMood } = req.body;
    const newUser = new User({
      fullname,
      email,
      password,
      isAdmin,
      googleId,
      geminiId,
      subjects,
      topics,
      avatar,
      ttsVoice,
      avatarMood,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users sorted by name, subjects, or topics
router.get("/users", async (req, res) => {
  try {
    const { sortBy = "fullname" } = req.query;
    const users = await User.find().populate("subjects topics").sort({ [sortBy]: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;