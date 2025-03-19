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

    // Call AI model for response
    const aiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` },
      }
    );

    const aiMessage = aiResponse.data.choices[0].message.content;

    // Save AI response
    const aiChat = new Chat({
      messages: [{ sender: "ai", text: aiMessage }],
      user: userId,
      topic: topicId,
    });
    await aiChat.save();

    res.status(201).json({ userMessage, aiMessage });
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;