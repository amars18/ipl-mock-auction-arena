require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const Room = require("./models/Room");
const User = require("./models/User");

const app = express();

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

app.get("/", (req, res) => {
  res.send("IPL Auction Backend Running");
});

app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", async (data) => {
    try {
      socket.join(data.roomId);

      let room = await Room.findOne({
        roomId: data.roomId,
      });

      if (!room) {
        room = new Room({
          roomId: data.roomId,
          users: [],
        });

        await room.save();
      }

      const existingUser = await User.findOne({
        username: data.username,
        roomId: data.roomId,
      });

      if (!existingUser) {
        await User.create({
          username: data.username,
          teamName: data.teamName,
          roomId: data.roomId,
        });

        room.users.push({
          username: data.username,
          teamName: data.teamName,
        });

        await room.save();
      }

      io.to(data.roomId).emit(
        "user-joined",
        data
      );

      console.log(
        `${data.username} joined ${data.roomId}`
      );
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running on port ${
      process.env.PORT || 5000
    }`
  );
});