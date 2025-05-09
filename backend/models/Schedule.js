const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true
    },
    meetingUrl: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: ['lecture', 'lab', 'workshop', 'exam', 'office-hours', 'other'],
      default: 'lecture'
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['scheduled', 'cancelled', 'completed', 'postponed'],
      default: 'scheduled'
    },
    resources: {
      type: [{ name: String, url: String, type: String }],
      default: []
    },
    participants: {
      type: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        attendance: {
          type: String,
          enum: ['present', 'absent', 'late', 'excused', 'not-recorded'],
          default: 'not-recorded'
        }
      }],
      default: []
    },
    reminders: {
      type: [{
        sentAt: Date,
        method: { type: String, enum: ['email', 'push', 'sms'] },
        status: { type: String, enum: ['pending', 'sent', 'failed'] }
      }],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Index for efficient querying
scheduleSchema.index({ course: 1, date: 1 });

// ✅ Virtual for schedule duration in minutes
scheduleSchema.virtual('duration').get(function () {
  const parseTime = time => {
    const [t, modifier] = time.split(" ");
    let [hours, minutes] = t.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  return parseTime(this.endTime) - parseTime(this.startTime);
});

// ✅ Validation: Ensure endTime is after startTime
scheduleSchema.pre('save', function (next) {
  const parse = t => parseInt(t.replace(/[^0-9]/g, ''));
  if (parse(this.startTime) >= parse(this.endTime)) {
    return next(new Error('End time must be after start time'));
  }
  next();
});

module.exports = mongoose.model("Schedule", scheduleSchema);
