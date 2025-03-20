const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const scheduleRoutes = require("./routes/scheduleRoutes.js");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());


// app.use("/api/schedules", scheduleRoutes);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port: ${port}`));

// export { io };
module.exports = app;
