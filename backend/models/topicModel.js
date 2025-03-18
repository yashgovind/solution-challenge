const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  aiGeneratedContent: { type: String },
});

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;