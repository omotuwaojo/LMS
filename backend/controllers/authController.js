// const { User } = require("../models/User");
// const bcrypt = require("bcryptjs")
// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")
// const crypto = require("crypto");
// const sanitizeHtml = require("sanitize-html");


// //Email configuration 

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,

//     auth:{
//         user: Email,
//         pass: EMAIL_PASSWORD,
//     },
//     tls:{
//         rejectUnauthorized: false
//     },
// });

// // ✅ Validate Email
// function emailAcceptance(email) {
//   const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return re.test(email.trim().toLowerCase());
// }

// // ✅ Validate Password (Min 8 chars, at least 1 uppercase, 1 number, 1 special char)
// function passwordAcceptance(password) {
//   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/;
//   return passwordRegex.test(password.trim());
// }

// // ✅ Validate Username (Min 4 chars, lowercase, numbers, -, _ only)
// function usernameAcceptance(username) {
//   username = username.trim();
  
//   if (username.length < 4) return { isValid: false, error: "Min 4 characters" };
//   if (!/[a-z]/.test(username)) return { isValid: false, error: "Must include a lowercase letter" };
//   if (!/^[a-z0-9_\-]+$/.test(username)) return { isValid: false, error: "Only a-z, 0-9, _ , -" };

//   return { isValid: true, error: null };
// }

// // ✅ Check for SQL Injection / XSS / Script Injection
// function isInjectionAttempt(input) {
//   const injectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|EXEC|UNION|SLEEP|OUTFILE|SCRIPT|IFRAME|ALERT|ONERROR|ONLOAD|INNER JOIN|WHERE|OR|AND)\b|--|\/\*|\*\/|;|\||`)/gi;
//   return injectionPattern.test(input.trim());
// }

// // ✅ Sanitize Messages (Prevent XSS attacks)
// function sanitizeMessage(message) {
//   return sanitizeHtml(message.trim(), {
//     allowedTags: [], // Remove all HTML tags
//     allowedAttributes: {}, // Remove all attributes
//   });
// }

// // ✅ General function to sanitize all user inputs
// function sanitizeInput(input) {
//   if (typeof input !== "string") return "";
//   return sanitizeHtml(input.trim(), {
//     allowedTags: [],
//     allowedAttributes: {},
//   });
// }

// // const refreshTokens = []; // Store refresh tokens (Use Redis/DB in production)

// // 🔹 Generate Access Token
// // const generateAccessToken = (user) => {
// //   return jwt.sign(
// //     { id: user.id, username: user.username, role: user.role },
// //     process.env.JWT_SECRET,
// //     { expiresIn: "15m" }
// //   );
// // };

// // 🔹 Generate Refresh Token
// // const generateRefreshToken = (user) => {
// //   const refreshToken = jwt.sign(
// //     { id: user.id, username: user.username },
// //     process.env.REFRESH_TOKEN_SECRET,
// //     { expiresIn: "7d" }
// //   );
// //   refreshTokens.push(refreshToken);
// //   return refreshToken;
// // };



//   // Login User
// // export const login = async (req, res) => {
// //     try {
// //       const { username, password } = req.body;

// //       // Sanitize input
// //     username = sanitizeInput(username);
// //     password = sanitizeInput(password);
  
// //       // Validate Inputs
// //       if (!username || !password) {
// //         return res.status(400).json({ error: "Username and password are required" });
// //       }
  
// //       // Find user by username
// //       const user = await User.findOne({ username });
  
// //       if (!user) {
// //         return res.status(401).json({ error: "Invalid username or password" });
// //       }
  
// //       // Check password
// //       const isMatch = await bcrypt.compare(password, user.password);
// //       if (!isMatch) {
// //         return res.status(401).json({ error: "Invalid username or password" });
// //       }
  
// //       // Update last login time
// //       user.lastLogin = Date.now();
// //       await user.save();
  
// //       // Generate JWT Token
// //       const token = jwt.sign(
// //         {
// //           id: user.id,
// //           name: user.name,
// //           username: user.username,
// //           role: user.role,
// //           gender: user.gender,
// //           email: user.email,
// //           avatar: user.avatar,
// //           lastLogin: user.lastLogin,
// //         },
// //         process.env.JWT_SECRET,
// //         { expiresIn: "1h" }
// //       );
  
// //       // Return Response
// //       res.status(200).json({
// //         message: `Welcome ${user.name}`,
// //         token,
// //         user: {
// //           id: user.id,
// //           name: user.name,
// //           username: user.username,
// //           role: user.role,
// //           gender: user.gender,
// //           email: user.email,
// //           avatar: user.avatar,
// //           lastLogin: user.lastLogin,
// //         },
// //       });
// //     } catch (error) {
// //       console.error("Login Error:", error);
// //       res.status(500).json({ error: "Unexpected error occurred" });
// //     }
// //   };

//   //Logout User
// //   // export const logout = async (req, res) => {
// //     try {
// //         // Clear the token cookie
// //         res.clearCookie("token", {
// //             httpOnly: true,
// //             secure: process.env.NODE_ENV === "production",
// //             sameSite: "strict"
// //         });

// //         return res.status(200).json({ message: "Logout successful" });
// //     } catch (error) {
// //         return res.status(500).json({ error: "Unexpected Error Occurred" });
// //     }
// // };

// // // export const register = async (req, res) => {
// //     try {
// //       let { name, username, email, password, role } = req.body;
  
// //       // 🔹 Sanitize Input
// //       name = sanitizeInput(name);
// //       username = sanitizeInput(username);
// //       email = sanitizeInput(email);
// //       password = sanitizeInput(password);
// //       role = sanitizeInput(role) || "student"; // Default role: "student"
  
// //       // 🔹 Input Validation
// //       if (!name || !username || !email || !password) {
// //         return res.status(400).json({ error: "All fields are required" });
// //       }
  
// //       if (!emailAcceptance(email)) {
// //         return res.status(400).json({ error: "Invalid email format" });
// //       }
  
// //       if (!passwordAcceptance(password)) {
// //         return res.status(400).json({
// //           error: "Password must be at least 8 chars, include 1 uppercase, 1 number, 1 special character",
// //         });
// //       }
  
// //       const usernameCheck = usernameAcceptance(username);
// //       if (!usernameCheck.isValid) {
// //         return res.status(400).json({ error: usernameCheck.error });
// //       }
  
// //       if (isInjectionAttempt(name) || isInjectionAttempt(username) || isInjectionAttempt(email)) {
// //         return res.status(400).json({ error: "Invalid input detected" });
// //       }
  
// //       if (!["student", "instructor", "admin"].includes(role.toLowerCase())) {
// //         return res.status(400).json({ error: "Invalid role" });
// //       }
  
// //       // 🔹 Check if user already exists
// //       const existingUser = await User.findOne({ $or: [{ email }, { username }] });
// //       if (existingUser) {
// //         return res.status(400).json({ error: "Email or username already taken" });
// //       }
  
// //       // 🔹 Hash Password
// //       const hashedPassword = await bcrypt.hash(password, 10);
  
// //       // 🔹 Create New User
// //       const newUser = new User({
// //         id: uuidv4(),
// //         name,
// //         username,
// //         email,
// //         password: hashedPassword,
// //         role,
// //       });
  
// //       await newUser.save();
  
// //     //   // 🔹 Generate Tokens
// //       const accessToken = generateAccessToken(newUser);
// //     //   const refreshToken = generateRefreshToken(newUser);
  
// //       res.status(201).json({
// //         message: "User registered successfully",
// //          accessToken,
// //         // refreshToken,
// //       });
// //     } catch (error) {
// //       console.error("Signup Error:", error);
// //       res.status(500).json({ error: "Internal server error" });
// //     }
// //   };


const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const AppError = require('../utils/ApiError');
const catchAsync = require('../utils/asyncHandler');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove sensitive data from output
  user.password = undefined;
  user.passwordConfirm = undefined;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  user.twoFactorSecret = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.register = catchAsync(async (req, res, next) => {
  // 1) Check if email already exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  // 2) Create new user
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role || 'student'
  });

  // 3) Generate email verification token
  const verificationToken = newUser.createEmailVerificationToken();
  await newUser.save({ validateBeforeSave: false });

  // 4) Send verification email
  const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${verificationToken}`;
  
  try {
    await sendEmail({
      email: newUser.email,
      subject: 'Verify your email address',
      template: 'emailVerification',
      variables: {
        name: newUser.firstName,
        verificationUrl: verificationURL
      }
    });

    createSendToken(newUser, 201, req, res);
  } catch (err) {
    newUser.emailVerificationToken = undefined;
    newUser.emailVerificationExpires = undefined;
    await newUser.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the verification email. Please try again later.', 500));
  }
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() }
  });

  // 2) If token has expired or user doesn't exist
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // 3) Verify user and clear token
  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password +loginAttempts +lockUntil');

  if (!user || !(await user.correctPassword(password, user.password))) {
    // Handle account locking
    if (user) {
      if (user.isAccountLocked()) {
        return next(new AppError('Account is temporarily locked due to too many failed attempts. Please try again later.', 401));
      }

      user.loginAttempts += 1;
      if (user.loginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + process.env.LOCK_TIME * 60 * 1000;
      }
      await user.save();
    }

    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) Check if account is locked
  if (user.isAccountLocked()) {
    return next(new AppError('Account is temporarily locked due to too many failed attempts. Please try again later.', 401));
  }

  // 4) Check if email is verified
  if (!user.isVerified) {
    return next(new AppError('Please verify your email address first', 401));
  }

  // 5) Reset login attempts on successful login
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLogin = Date.now();
  await user.save();

  // 6) If 2FA enabled, return temp token instead of final auth
  if (user.twoFactorEnabled) {
    const tempToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '5m'
    });

    return res.status(200).json({
      status: 'success',
      message: 'Two-factor authentication required',
      tempToken
    });
  }

  // 7) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      template: 'passwordReset',
      variables: {
        name: user.firstName,
        resetUrl: resetURL
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // 3) If so, update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.verifyTwoFactor = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  
  // 1) Verify the temp token
  const decoded = await promisify(jwt.verify)(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
  
  // 2) Get the user
  const user = await User.findById(decoded.id).select('+twoFactorSecret');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  // 3) Verify the 2FA token (implementation depends on your 2FA library)
  const isValid = true; // Replace with actual 2FA verification
  
  if (!isValid) {
    return next(new AppError('Invalid two-factor token', 401));
  }
  
  // 4) If valid, send final auth token
  createSendToken(user, 200, req, res);
});


