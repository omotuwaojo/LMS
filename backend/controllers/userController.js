const { User } = require("../models/User");
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const crypto = require("crypto");
const sanitizeHtml = require("sanitize-html");


//Email configuration 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth:{
        user: Email,
        pass: EMAIL_PASSWORD,
    },
    tls:{
        rejectUnauthorized: false
    },
});

// ✅ Validate Email
function emailAcceptance(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim().toLowerCase());
}

// ✅ Validate Password (Min 8 chars, at least 1 uppercase, 1 number, 1 special char)
function passwordAcceptance(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/;
  return passwordRegex.test(password.trim());
}

// ✅ Validate Username (Min 4 chars, lowercase, numbers, -, _ only)
function usernameAcceptance(username) {
  username = username.trim();
  
  if (username.length < 4) return { isValid: false, error: "Min 4 characters" };
  if (!/[a-z]/.test(username)) return { isValid: false, error: "Must include a lowercase letter" };
  if (!/^[a-z0-9_\-]+$/.test(username)) return { isValid: false, error: "Only a-z, 0-9, _ , -" };

  return { isValid: true, error: null };
}

// ✅ Check for SQL Injection / XSS / Script Injection
function isInjectionAttempt(input) {
  const injectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|EXEC|UNION|SLEEP|OUTFILE|SCRIPT|IFRAME|ALERT|ONERROR|ONLOAD|INNER JOIN|WHERE|OR|AND)\b|--|\/\*|\*\/|;|\||`)/gi;
  return injectionPattern.test(input.trim());
}

// ✅ Sanitize Messages (Prevent XSS attacks)
function sanitizeMessage(message) {
  return sanitizeHtml(message.trim(), {
    allowedTags: [], // Remove all HTML tags
    allowedAttributes: {}, // Remove all attributes
  });
}

// ✅ General function to sanitize all user inputs
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return sanitizeHtml(input.trim(), {
    allowedTags: [],
    allowedAttributes: {},
  });
}

// const refreshTokens = []; // Store refresh tokens (Use Redis/DB in production)

// 🔹 Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

// 🔹 Generate Refresh Token
// const generateRefreshToken = (user) => {
//   const refreshToken = jwt.sign(
//     { id: user.id, username: user.username },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: "7d" }
//   );
//   refreshTokens.push(refreshToken);
//   return refreshToken;
// };



  // Login User
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Sanitize input
    username = sanitizeInput(username);
    password = sanitizeInput(password);
  
      // Validate Inputs
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
  
      // Find user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      // Update last login time
      user.lastLogin = Date.now();
      await user.save();
  
      // Generate JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
          gender: user.gender,
          email: user.email,
          avatar: user.avatar,
          lastLogin: user.lastLogin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Return Response
      res.status(200).json({
        message: `Welcome ${user.name}`,
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
          gender: user.gender,
          email: user.email,
          avatar: user.avatar,
          lastLogin: user.lastLogin,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  };

  //Logout User
  export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error Occurred" });
    }
};

export const register = async (req, res) => {
    try {
      let { name, username, email, password, role } = req.body;
  
      // 🔹 Sanitize Input
      name = sanitizeInput(name);
      username = sanitizeInput(username);
      email = sanitizeInput(email);
      password = sanitizeInput(password);
      role = sanitizeInput(role) || "student"; // Default role: "student"
  
      // 🔹 Input Validation
      if (!name || !username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      if (!emailAcceptance(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
  
      if (!passwordAcceptance(password)) {
        return res.status(400).json({
          error: "Password must be at least 8 chars, include 1 uppercase, 1 number, 1 special character",
        });
      }
  
      const usernameCheck = usernameAcceptance(username);
      if (!usernameCheck.isValid) {
        return res.status(400).json({ error: usernameCheck.error });
      }
  
      if (isInjectionAttempt(name) || isInjectionAttempt(username) || isInjectionAttempt(email)) {
        return res.status(400).json({ error: "Invalid input detected" });
      }
  
      if (!["student", "instructor", "admin"].includes(role.toLowerCase())) {
        return res.status(400).json({ error: "Invalid role" });
      }
  
      // 🔹 Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: "Email or username already taken" });
      }
  
      // 🔹 Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 🔹 Create New User
      const newUser = new User({
        id: uuidv4(),
        name,
        username,
        email,
        password: hashedPassword,
        role,
      });
  
      await newUser.save();
  
    //   // 🔹 Generate Tokens
      const accessToken = generateAccessToken(newUser);
    //   const refreshToken = generateRefreshToken(newUser);
  
      res.status(201).json({
        message: "User registered successfully",
         accessToken,
        // refreshToken,
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


