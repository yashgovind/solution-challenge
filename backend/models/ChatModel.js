const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      sender: { type: String, enum: ["user", "ai"], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;