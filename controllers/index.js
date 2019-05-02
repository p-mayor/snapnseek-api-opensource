const users = require("./users");
const guesses = require("./guesses");
const likes = require("./likes");
const { router } = require("./auth");
const targets = require("./targets");

module.exports = {
  auth: router,
  likes,
  guesses,
  users,
  targets
};
