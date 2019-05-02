"use strict";
module.exports = function(sequelize, DataTypes) {
  const Like = sequelize.define(
    "like",
    {
      userId: DataTypes.INTEGER,
      guessId: DataTypes.INTEGER
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["updatedAt"]
        }
      }
    }
  );
  return Like;
};
