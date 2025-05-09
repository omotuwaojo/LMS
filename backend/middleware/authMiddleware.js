// const jwt =require("jsonwebtoken");
// const User = require("../models/User.js");


// // Middle ware to verify person if it is authorized or not to join route

// //VerifyAdmin
// export const VerifyTokenForAdmin = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     res.status(401).json({ error: "You must login first" });
//     next("ERROR IN: VerifyTokenForAdmin function => Token is required");
//     return;
//   }

//   try {
//     let decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // change decode to authorization
//     decoded.role = decoded.role.toLowerCase();
//     if (decoded.role === "admin"){
//       req.user = decoded;
//       next();
//     }else{
//       res,status(401).json({error: "You are not authorized"})
//       next("ERROR IN: VerifyTokenForAdmin function => Invalid role");
//     }
//   } catch (error) {
//     if (error.name === "TokenExpiredError"){
//       res.status(401).json({ error: "Session Expired, please login again" });
//     }else{
//       res.status(401).json({ error: "Invalid credentials" });
//     }
//     next(`ERROR IN: VerifyTokenForAdmin function => ${error}`);
//   }
// };

// //VerrifyInstructor
// export const VerifyTokenForTeacher = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     res.status(401).json({ error: "You must login first" });
//     next("ERROR IN: VerifyTokenForInstructor function => Token is required");
//     return;
// }
//   try {
//     let decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // change decode to authorization
//     decoded.role = decoded.role.toLowerCase();
//     if (decoded.role === "instructor" || decoded.role == "admin" ){
//       req.user = decoded;
//       next();
//     }else{
//       res,status(401).json({error: "You are not authorized"})
//       next("ERROR IN: VerifyTokenForInstructor function => Invalid role");
//     }
//   } catch (error) {
//     if (error.name === "TokenExpiredError"){
//       res.status(401).json({ error: "Session Expired, please login again" });
//     }else{
//       res.status(401).json({ error: "Invalid credentials" });
//     }
//     next(`ERROR IN: VerifyTokenForInstructor function => ${error}`);
//   }
// };


// //VerrifyStudent
// export const VerifyTokenForUser = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     res.status(401).json({ error: "You must login first" });
//     next("ERROR IN: VerifyTokenForUser function => Token is required");
//     return;
// }
//   try {
//     let decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // change decode to authorization
//     decoded.role = decoded.role.toLowerCase();
//     if (decoded.role === "student" || decoded.role === "instructor" || decoded.role == "admin" ){
//       req.user = decoded;
//       next();
//     }else{
//       res,status(401).json({error: "You are not authorized"})
//       next("ERROR IN: VerifyTokenForStudent function => Invalid role");
//     }
//   } catch (error) {
//     if (error.name === "TokenExpiredError"){
//       res.status(401).json({ error: "Session Expired, please login again" });
//     }else{
//       res.status(401).json({ error: "Invalid credentials" });
//     }
//     next(`ERROR IN: VerifyTokenForStudent function => ${error}`);
//   }
// };

// // export const protect = async (req, res, next) => {
// //   const token = req.header("Authorization");

// //   if (!token) return res.status(401).json({ message: "Unauthorized" });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = await User.findById(decoded.id).select("-password");
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: "Invalid Token" });
// //   }
// // };

// // Middleware to check if user is authenticated
// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized access" });
//     }

//     req.user = user; // Attach user to request object
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Middleware to verify specific roles
// const verifyRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access Denied: Insufficient Role Permissions" });
//     }
//     next();
//   };
// };

// module.exports = { authMiddleware, verifyRole };

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/ApiError');

const protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists.', 401)
      );
    }

    // 4) Check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }

    // 5) Check if email is verified
    if (!currentUser.isVerified) {
      return next(
        new AppError('Please verify your email address to access this resource.', 403)
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

const checkAccountStatus = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated', 403));
  }
  
  next();
};

module.exports = {
  protect,
  restrictTo,
  checkAccountStatus
};