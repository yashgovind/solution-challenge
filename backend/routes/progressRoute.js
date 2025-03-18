// routes/progressRoutes.js
const express = require("express");
const router = express.Router();

// Update player progress
router.put('/progress', async (req, res) => {
  try {
    const { userId, materialId, progress } = req.body;

    const updatedProgress = await PlayerProgress.findOneAndUpdate(
      { user: userId, material: materialId },
      {
        $max: { progress },
        $set: { isCompleted: progress >= 95 }
      },
      { new: true, upsert: true }
    );

    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress
router.get('/users/:userId/progress', async (req, res) => {
  try {
    const progress = await PlayerProgress.find({ user: req.params.userId })
      .populate('material')
      .sort({ updatedAt: -1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;