const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user.route");
const blog = require("./routes/blog.route");
const event = require("./routes/event.route");
const chatbot = require("./routes/chatbot.route");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || "4000";
const db = "mongodb://localhost/fire";
const app = express();

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
