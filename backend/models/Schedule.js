const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course", 
    required: true },
  date: { 
    type: Date, 
    required: true },
  startTime: { 
    type: String,
     required: true },
  endTime: { 
    type: String,
     required: true },
  topic: { 
    type: String, 
    required: true },
}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);
