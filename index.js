const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user.route");
const blog = require("./routes/blog.route");
const event = require("./routes/event.route");
const chatbot = require("./routes/chatbot.route");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);
const axios = require("axios");
var io = require("socket.io").listen(server);
const PORT = process.env.PORT || "3000";
const db = "mongodb://localhost/fire";

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user);
app.use("/blog", blog);
app.use("/event", event);
app.use("/chatbot", chatbot);

io.on("connection", socket => {
  console.log("user connected");

  socket.on("messagedetection", (senderNickname, messageContent) => {
    axios
      .post("http://127.0.0.1:3000/chatbot/bot", {
        input: messageContent
      })
      .then(res => {
        let message = { message: res.data.reply, senderNickname: "Chatbot" };
        io.emit("message", message);
      });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
