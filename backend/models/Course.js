const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: { type: String, required: true },
    fileType: { type: String }, // PDF, video, link, etc.
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: String,
    thumbnail: String,
    isPublished: { type: Boolean, default: false },
    sections: [
      {
        title: String,
        lessons: [
          {
            title: String,
            content: String,
            videoUrl: String,
            duration: Number,
            isFree: { type: Boolean, default: false },
          },
        ],
      },
    ],
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    announcement: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement",
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
