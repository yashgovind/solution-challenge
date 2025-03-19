// routes/contentRoutes.js
const express = require("express");
const router = express.Router();
const Topic = require("../models/topicModel");

// get topics by subject. --> find subject by their id.

// Get topics by subject
router.get('/subjects/:subjectId/topics', async (req, res) => {
  try {
    const topics = await Topic.find({ subject: req.params.subjectId })
      .populate('learningMaterials')
      .sort({ order: 1 });

    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;