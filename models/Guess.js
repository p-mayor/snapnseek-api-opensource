"use strict";
module.exports = function(sequelize, DataTypes) {
  const Guess = sequelize.define(
    "guess",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: "Guess text must be between 2 and 255 characters"
          }
        }
      },
      userId: DataTypes.INTEGER,
      pictureURL: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pictureContentType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      targetId: DataTypes.INTEGER
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["updatedAt"]
        }
      }
    }
  );
  return Guess;
};
