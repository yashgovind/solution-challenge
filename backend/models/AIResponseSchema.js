const mongoose = require("mongoose");

const AIResponseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const AIResponse = mongoose.model("AIResponse", AIResponseSchema);

module.exports = AIResponse;