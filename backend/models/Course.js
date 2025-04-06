const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: {
    type: String, 
    required: true },
  title: { 
    type: String, 
    required: true },
  description: { 
    type: String, 
    required: true },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  schedule: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Schedule" }],
  announcement: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Announcement" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
