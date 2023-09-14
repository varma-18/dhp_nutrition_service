const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Conversation, Message } = require("../models");

const createNewConversation = asyncHandler(async (req, res) => {
  const { providerId } = req.params;
  const { patientId, topic } = req.body;

  const conversation = await Conversation.create({
    topic,
    providerId,
    patientId: Number(patientId),
  });

  res.status(201).location(`/conversations/${conversation.id}`).end();
});

const fetchAllProviderConversations = asyncHandler(async (req, res) => {
  const { providerId } = req.params;
  const { patientId } = req.query;

  const conversations = patientId
    ? await Conversation.findAll({
        where: {
          [Op.and]: [{ providerId }, { patientId }],
        },
      })
    : await Conversation.findAll({
        where: { providerId },
      });

  res.json(conversations);
});

const fetchAllPatientConversations = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const { providerId } = req.query;

  const conversations = providerId
    ? await Conversation.findAll({
        where: {
          [Op.and]: [{ providerId }, { patientId }],
        },
      })
    : await Conversation.findAll({
        where: {
          patientId,
        },
      });

  res.json(conversations);
});

const fetchConversationMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const messages = await Message.findAll({
    where: { conversationId },
    order: [["updatedAt", "ASC"]],
  });

  res.json(messages);
});

module.exports = {
  createNewConversation,
  fetchAllProviderConversations,
  fetchAllPatientConversations,
  fetchConversationMessages,
};
