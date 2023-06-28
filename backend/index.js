const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("chat message");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
server.listen(PORT, () => {
  console.log(`listening on port ${PORT} `);
});
