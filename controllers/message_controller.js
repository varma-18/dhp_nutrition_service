const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Conversation, Message } = require("../models");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, conversationId, senderId } = req.body;

  const message = await Message.create({
    content,
    conversationId,
    senderId,
    flag: "sent",
  });

  res.json(message);
});

const sendQuickMessage = asyncHandler(async (req, res) => {
  const { providerId } = req.params;
  const { content } = req.body;
  const { patientId } = req.query;

  let conversation;

  conversation = await Conversation.findOne({
    where: {
      [Op.and]: [{ providerId }, { patientId }, { topic: "Quick message" }],
    },
  });

  // Create a default convo if, it doesn't already exist
  if (!conversation) {
    conversation = await Conversation.create({
      providerId,
      patientId: Number(patientId),
    });
  }

  const message = await Message.create({
    content,
    conversationId: conversation.id,
    senderId: providerId,
    flag: "sent",
  });

  res.json(message);
});

module.exports = { sendMessage, sendQuickMessage };
