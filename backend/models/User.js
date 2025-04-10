// const mongoose = require("mongoose");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken")

// const userSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["admin", "instructor", "student"],
//       required: true,
//     },
//     profile: {
//       firstName: String,
//       lastName: String,
//       avater: String,
//       bio: String,
//     },
//     gender: {
//       type: String,
//       enum: ["Male", "Female"],
//       required: true,
//     },

//     //   avatar: { type: String, default: 'https://avatar.iran.liara.run/public/1' },
  

//     resetPasswordToken: String,
//     resetPasswordExpires: Date,
//     refreshToken: { type: String },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//     lastLogin: { type: Date, default: null },
//   },
//   { timestamps: true }
// );

// // Instructor-specific fields
// const instructorSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Type.ObjectId, ref: "User", unique: true },
//   qualifications: [String],
//   expertise: [String],
//   coursesTeaching: [{ type: mongoose.Schema.Type.ObjectId, ref: "Course" }],
// });

// // Student-specific fields
// const studentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
//   enrolledCourses: [
//     {
//       course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//       enrollmentDate: Date,
//       progress: Number,
//       completed: Boolean,
//     },
//   ],
// });

// userSchema.pre("save", async function (next) {
  
//   if(!this.modified("password")) return next()
//   this.password = bcryptjs.hash(this.password, 10)
//   next()
// })
// userSchema.methods.isPasswordCorrect = async function (password){
//   return await bcryptjs.compare(password, this.password)
// }

// userSchema.methods.generateAccessToken = function (){
//   // short lived access token
//    return jwt.sign({
//     _id: this._id,
//     email: this.email,
//     username: this.username,
//     // fullname: this.fullname
//   },
//   process.env.ACCESS_TOKEN_SECRET,
//   { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
// );
// }
// userSchema.methods.generaterRefreshToken = function (){
//   // short lived access token
//    return jwt.sign({
//     _id: this._id,
//     // email: this.email,
//     // username: this.username,
//     // fullname: this.fullname
//   },
//   process.env.REFRESH_TOKEN_SECRET,
//   { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
// );
// }
// module.exports = mongoose.model(
//   "User",
//   userSchema,
//   "Instructor",
//   instructorSchema,
//   "Student",
//   studentSchema
// );

// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const validator = require('validator');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     validate: [validator.isEmail, 'Please provide a valid email']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 8,
//     select: false
//   },
//   passwordConfirm: {
//     type: String,
//     required: [true, 'Please confirm your password'],
//     validate: {
//       validator: function(el) {
//         return el === this.password;
//       },
//       message: 'Passwords do not match'
//     }
//   },
//   passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date,
//   active: {
//     type: Boolean,
//     default: true,
//     select: false
//   },
//   role: {
//     type: String,
//     enum: ['student', 'instructor', 'admin'],
//     default: 'student'
//   }
// }, {
//   timestamps: true
// });

// // Password encryption middleware
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
//   next();
// });

// // Update passwordChangedAt when password is modified
// userSchema.pre('save', function(next) {
//   if (!this.isModified('password') || this.isNew) return next();
  
//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// // Instance method to check password
// userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// // Instance method to check if password was changed after token was issued
// userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// // Instance method to create password reset token
// userSchema.methods.createPasswordResetToken = function() {
//   const resetToken = crypto.randomBytes(32).toString('hex');
  
//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');
  
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
//   return resetToken;
// };

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  // Authentication Fields
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
    validate: {
      validator: function(val) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);
      },
      message: 'Password must contain at least one uppercase, one lowercase, one number and one special character'
    }
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Profile Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  avatar: {
    type: String,
    default: 'default.jpg'
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot be longer than 500 characters']
  },
  
  // Role Management
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false
  },
  
  // Student Specific Fields
  studentProfile: {
    enrollmentDate: Date,
    gradeLevel: String,
    major: String,
    completedCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    currentCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }]
  },
  
  // Instructor Specific Fields
  instructorProfile: {
    hireDate: Date,
    department: String,
    qualifications: [String],
    officeLocation: String,
    officeHours: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      startTime: String,
      endTime: String
    }],
    bio: String,
    socialMedia: {
      website: String,
      twitter: String,
      linkedin: String
    }
  },
  
  // System Fields
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  lockUntil: {
    type: Date,
    select: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    select: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

// Document Middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Query Middleware
userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

// Instance Methods
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

userSchema.methods.isAccountLocked = function() {
  return this.lockUntil && this.lockUntil > Date.now();
};

module.exports = mongoose.model('User', userSchema);