const jwt =require("jsonwebtoken");
const { JWT_SECRET } = require("../.env");
const User = require("../models/User.js");


// Middle ware to verify person if it is authorized or not to join route

//VerifyAdmin
export const VerifyTokenForAdmin = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "You must login first" });
    next("ERROR IN: VerifyTokenForAdmin function => Token is required");
    return;
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // change decode to authorization
    decoded.role = decoded.role.toLowerCase();
    if (decoded.role === "admin"){
      req.user = decoded;
      next();
    }else{
      res,status(401).json({error: "You are not authorized"})
      next("ERROR IN: VerifyTokenForAdmin function => Invalid role");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError"){
      res.status(401).json({ error: "Session Expired, please login again" });
    }else{
      res.status(401).json({ error: "Invalid credentials" });
    }
    next(`ERROR IN: VerifyTokenForAdmin function => ${error}`);
  }
};

//VerrifyInstructor
export const VerifyTokenForTeacher = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "You must login first" });
    next("ERROR IN: VerifyTokenForInstructor function => Token is required");
    return;
}
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // change decode to authorization
    decoded.role = decoded.role.toLowerCase();
    if (decoded.role === "instructor" || decoded.role == "admin" ){
      req.user = decoded;
      next();
    }else{
      res,status(401).json({error: "You are not authorized"})
      next("ERROR IN: VerifyTokenForInstructor function => Invalid role");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError"){
      res.status(401).json({ error: "Session Expired, please login again" });
    }else{
      res.status(401).json({ error: "Invalid credentials" });
    }
    next(`ERROR IN: VerifyTokenForInstructor function => ${error}`);
  }
};


//VerrifyStudent
export const VerifyTokenForUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "You must login first" });
    next("ERROR IN: VerifyTokenForUser function => Token is required");
    return;
}
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // change decode to authorization
    decoded.role = decoded.role.toLowerCase();
    if (decoded.role === "student" || decoded.role === "instructor" || decoded.role == "admin" ){
      req.user = decoded;
      next();
    }else{
      res,status(401).json({error: "You are not authorized"})
      next("ERROR IN: VerifyTokenForStudent function => Invalid role");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError"){
      res.status(401).json({ error: "Session Expired, please login again" });
    }else{
      res.status(401).json({ error: "Invalid credentials" });
    }
    next(`ERROR IN: VerifyTokenForStudent function => ${error}`);
  }
};

// export const protect = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };

// Middleware to check if user is authenticated
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to verify specific roles
const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied: Insufficient Role Permissions" });
    }
    next();
  };
};

module.exports = { authMiddleware, verifyRole };
