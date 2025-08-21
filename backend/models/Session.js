const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: { type: String, required: true },
  experience: { type: String, required: true },
  topicsToFocus: { type: String, required: true },
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  lastAccessedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Update session progress metadata
// Currently we track lastAccessedAt as a proxy for activity
sessionSchema.methods.updateProgress = async function updateProgress() {
  this.lastAccessedAt = new Date();
  // Avoid validation and hooks for a lightweight metadata update
  await this.save({ validateBeforeSave: false });
  return this;
};

module.exports = mongoose.model("Session", sessionSchema);