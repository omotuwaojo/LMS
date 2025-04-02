const express = require('express');
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
// const io = new Server(server, { cors: { origin: "*" } });

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
})
);


//middleware
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb"}));
app.use(express.static("public"));


// import routes
const healthcheckRouter = require("./routes/healthcheckRoutes.js")

// routes
app.use(healthcheckRouter);

//port and database conection
const port = process.env.PORT || 3000;

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
