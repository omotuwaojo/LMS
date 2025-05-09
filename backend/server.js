const express = require('express');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
// const mongooseSantinizer = require('mongoose-sanitizer');
const helmet = require('helmet');
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");


dotenv.config({
    path: "./.env"
});

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
// const io = new Server(server, { cors: { origin: "*" } });

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
})
);

// Rate Limit Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

// Apply rate limiter
app.use(helmet());
app.use('/api',limiter);


// Logging Middleware requests
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}


//Body Parser Middlewear
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({ extended: true, limit: "10kb"}));
app.use(express.static("public"));


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        status: "error",
        success: false,
        message: err.message || "Intenal Server error",
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack})
     });
});


// import routes
const healthcheckRouter = require("./routes/healthcheckRoutes.js")

// routes
app.use(healthcheckRouter);




// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        success: false,
        message: "Page not found"
     });
});



//Port and Database conection
connectDB()
.then(() => {
    server.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    });
})
.catch((err) => {
    console.log("Mongodb connection error", err)
});


// export { io };
module.exports = app;
