const {
  sendMessage,
  sendQuickMessage,
} = require("../controllers/message_controller");
const auth = require("../middlewares/auth");
const router = require("express").Router();
const { body, param, query } = require("express-validator");
const { withValidation, validationOptions } = require("../utils");

// Send message within a particular convo
router.post(
  "",
  auth,
  [
    body("content", "ERR_CONTENT_EMPTY").exists(validationOptions),
    body("conversationId", "ERR_CONVERSATION_ID_EMPTY").exists(
      validationOptions
    ),
    body("senderId", "ERR_SENDER_ID_EMPTY").exists(validationOptions),
  ],
  (req, res) => withValidation(req, res, sendMessage)
);

// Allows provider to send a quick message (using default convo)
router.post(
  "/provider/:providerId/quick",
  auth,
  body("content", "ERR_CONTENT_EMPTY").exists(validationOptions),
  query("patientId", "ERR_PATIENT_ID_EMPTY").exists(validationOptions),
  param("providerId", "ERR_PROVIDER_ID_EMPTY").exists(validationOptions),
  (req, res) => withValidation(req, res, sendQuickMessage)
);

module.exports = router;
