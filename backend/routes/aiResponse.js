const express = require("express");
const router = express.Router();
const Chat = require("../models/ChatModel");
const axios = require("axios");

// Create a chat message and integrate AI response
router.post("/chats", async (req, res) => {
  try {
    const { message, userId, topicId } = req.body;

    // Save user message
    const userMessage = new Chat({
      messages: [{ sender: "user", text: message }],
      user: userId,
      topic: topicId,
    });
    await userMessage.save();
  }
   catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
   }
});

// Get chat history for a topic
router.get("/chats/topic/:topicId", async (req, res) => {
  try {
    const chats = await Chat.find({ topic: req.params.topicId })
      .populate("user", "fullname avatar")
      .sort({ "messages.timestamp": -1 })
      .limit(50);

    res.json(chats);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;