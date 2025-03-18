const mongoose = require("mongosoe");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullname: { type: String },
    email: { type: String, unique: true },
    password: { type: String, minLength: 6, maxLength: 20, trim: true },
    isAdmin: { type: Boolean, default: false },
    googleId: { type: String },
    openAiId: { type: String },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    avatar: String,          // Ready Player Me GLB URL
    ttsVoice: String,        // e.g., "en-US-Standard-D"
    avatarMood: {            // Default mood
      type: String,
      default: "neutral"
    },
})

const User = mongoose.model("User", userSchema);

module.exports = User;