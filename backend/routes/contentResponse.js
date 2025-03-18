// routes/contentRoutes.js
const express = require("express");
const router = express.Router();

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

// Get learning materials for topic
router.get('/topics/:topicId/materials', async (req, res) => {
  try {
    const materials = await LearningMaterial.find({ topic: req.params.topicId })
      .sort({ type: 1, createdAt: -1 });

    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;