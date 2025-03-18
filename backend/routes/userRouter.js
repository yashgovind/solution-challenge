// routes/userRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Get users filtered by subjects with aggregation pipeline
router.get('/users/by-subjects', async (req, res) => {
  try {
    const { subjectIds, sortBy = 'name' } = req.query;

    const pipeline = [
      {
        $lookup: {
          from: 'subjects',
          localField: 'enrolledSubjects',
          foreignField: '_id',
          as: 'enrolledSubjectsData'
        }
      },
      {
        $match: {
          'enrolledSubjectsData._id': {
            $in: subjectIds.split(',').map(id => new mongoose.Types.ObjectId(id))
          }
        }
      },
      {
        $sort: { [sortBy]: 1 }
      },
      {
        $project: {
          name: 1,
          email: 1,
          avatar: 1,
          enrolledSubjects: 1,
          createdAt: 1
        }
      }
    ];

    const users = await User.aggregate(pipeline);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;