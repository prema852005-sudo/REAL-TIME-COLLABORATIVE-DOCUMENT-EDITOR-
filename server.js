const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const FILE_PATH = "document.txt";

io.on("connection", async (socket) => {
  console.log("User Connected");

  // Load saved data
  if (await fs.pathExists(FILE_PATH)) {
    const savedText = await fs.readFile(FILE_PATH, "utf-8");
    socket.emit("load-document", savedText);
  }

  // Real-time changes
  socket.on("send-changes", async (data) => {

    // Send to other users
    socket.broadcast.emit("receive-changes", data);

    // Save data in text file
    await fs.writeFile(FILE_PATH, data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});