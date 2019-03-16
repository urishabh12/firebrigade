const RiveScript = require("rivescript");
const express = require("express");
const router = express.Router();

let bot = new RiveScript();
bot
  .loadDirectory("brain")
  .then(loading_done)
  .catch(loading_error);
bot
  .loadFile("brain/chatter.rive")
  .then(loading_done)
  .catch(loading_error);

function loading_done() {
  console.log("Bot has finished loading!");
}

function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}

router.post("/bot", (req, res, next) => {
  bot.sortReplies();
  let username = "local-user";
  bot.reply(username, req.body.input).then(function(reply) {
    res.json({ reply: reply });
  });
});

module.exports = router;
