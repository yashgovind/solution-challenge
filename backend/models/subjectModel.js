const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;