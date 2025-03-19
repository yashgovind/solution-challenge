// routes/aiResponseRoutes.js
const express = require("express");
const router = express.Router();
const aiResponse = require("../models/AIResponseSchema");

// Generate AI response
router.post('/ai-responses', async (req, res) => {
    try {
        console.log(req.body);
    const { prompt, topicId } = req.body;

    // Example OpenAI integration
    const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` }
    });

    const newResponse = new AIResponse({
      content: aiResponse.data.choices[0].message.content,
      topic: topicId,
      metadata: {
        model: "gpt-4",
        tokensUsed: aiResponse.data.usage.total_tokens
      }
    });

    await newResponse.save();
    res.status(201).json(newResponse);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;