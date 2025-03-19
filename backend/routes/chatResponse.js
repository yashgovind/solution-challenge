// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const Chat = require("../models/ChatModel");

// Create chat message
router.post('/chats', async (req, res) => {
  try {
    const { message, userId, topicId } = req.body;

    const newChat = new Chat({
      message,
      user: userId,
      topic: topicId,
      timestamp: new Date()
    });

    await newChat.save();

    // Real-time update logic would go here
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat history for topic
router.get('/chats/topic/:topicId', async (req, res) => {
  try {
    const chats = await Chat.find({ topic: req.params.topicId })
      .populate('user', 'name avatar')
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;