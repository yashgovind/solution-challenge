const express = require("express");
const router = express.Router();
const Subject = require("../models/subjectModel");

// Create a new subject
router.post("/subjects", async (req, res) => {
  try {
    const { name, topics } = req.body;
    const newSubject = new Subject({ name, topics });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all subjects
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().populate("topics").sort({$gt:0});
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single subject by ID
router.get("/subjects/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("topics");
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a subject
router.put("/subjects/:id", async (req, res) => {
  try {
    const { name, topics } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, topics },
      { new: true }
    );
    if (!updatedSubject) return res.status(404).json({ error: "Subject not found" });
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a subject
router.delete("/subjects/:id", async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) return res.status(404).json({ error: "Subject not found" });
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;