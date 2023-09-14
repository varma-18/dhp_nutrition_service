"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {}
  Message.init(
    {
      content: DataTypes.STRING,
      flag: DataTypes.ENUM("sent", "delivered", "read"),
      senderId: DataTypes.INTEGER,
      conversationId: DataTypes.INTEGER,
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
