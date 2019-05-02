const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

// import models into sequelize
const Like = sequelize.import("./Like");
const Guess = sequelize.import("./Guess");
const User = sequelize.import("./User");
const Target = sequelize.import("./Target")

// setup associations between models
User.hasMany(Guess);
User.hasMany(Target);

Target.belongsTo(User);

Guess.belongsTo(User);
Guess.hasMany(Like);

Like.belongsTo(User);
Like.belongsTo(Guess);

module.exports = {
  sequelize,
  Like,
  Guess,
  User,
  Target
};
