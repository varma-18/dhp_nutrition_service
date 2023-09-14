const {
  createNewConversation,
  fetchAllProviderConversations,
  fetchAllPatientConversations,
  fetchConversationMessages,
} = require("../controllers/conversation_controller");
const auth = require("../middlewares/auth");
const { body, param, query } = require("express-validator");
const { withValidation, validationOptions } = require("../utils");
const router = require("express").Router();

// Fetch messages for a particular convo
router.get(
  "/conversations/:conversationId",
  auth,
  [
    param("conversationId", "ERR_CONVERSATION_ID_EMPTY").exists(
      validationOptions
    ),
  ],
  (req, res) => withValidation(req, res, fetchConversationMessages)
);

router
  .route("/provider/:providerId/conversations")
  // Get all convos between between a provider and patient
  .get(
    auth,
    [
      query("patientId", "ERR_PATIENT_ID_EMPTY")
        .exists({
          checkFalsy: true,
        })
        .optional(),
      param("providerId", "ERR_PROVIDER_ID_EMPTY").exists(validationOptions),
    ],
    (req, res) => withValidation(req, res, fetchAllProviderConversations)
  )
  // Provider creates a new convo with a patient
  .post(
    auth,
    [
      body("patientId", "ERR_PATIENT_ID_EMPTY").exists(validationOptions),
      body("topic", "ERR_TOPIC_EMPTY").exists(validationOptions),
      param("providerId", "ERR_PROVIDER_ID_EMPTY").exists(validationOptions),
    ],
    (req, res) => withValidation(req, res, createNewConversation)
  );

// Get all convos between between a patient and provider
router.get(
  "/patient/:patientId/conversations",
  auth,
  [
    query("providerId", "ERR_PROVIDER_ID_EMPTY").exists(validationOptions),
    param("patientId", "ERR_PATIENT_ID_EMPTY")
      .exists(validationOptions)
      .optional(),
  ],
  (req, res) => withValidation(req, res, fetchAllPatientConversations)
);

module.exports = router;
