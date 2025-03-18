// server.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
// Google TTS Proxy Route
router.use(  "/api/tts" ,isAuthenticated);
router.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'en-US', voice = 'en-US-Standard-D' } = req.body;

    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_KEY}`,
      {
        input: { text },
        voice: {
          languageCode: language,
          name: voice
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 1.0,
          pitch: 0
        }
      }
    );

    res.json({
      audio: `data:audio/mp3;base64,${response.data.audioContent}`,
      visemes: [] // Add viseme generation logic here if needed
    });

  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: 'Text-to-speech failed' });
  }
});

module.exports = router;