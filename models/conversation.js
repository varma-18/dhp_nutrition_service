"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.hasMany(models.Message, {
        foreignKey: "conversationId",
      });
    }
  }
  Conversation.init(
    {
      topic: {
        type: DataTypes.STRING,
        defaultValue: "Quick message",
      },
      providerId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
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
      modelName: "Conversation",
    }
  );
  return Conversation;
};
