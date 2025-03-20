const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true},
  name: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  gender: { 
    type: String, 
    enum:["Male", "Female"],
     required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["student", "instructor", "admin"], 
    default: "student" },
    avatar: { type: String, default: 'https://avatar.iran.liara.run/public/1' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
});

module.exports = mongoose.model("User", userSchema);