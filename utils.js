const { validationResult } = require("express-validator");

const withValidation = (req, res, exec) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  exec(req, res);
};

const validationOptions = {
  checkNull: true,
  checkFalsy: true,
};

module.exports = { withValidation, validationOptions };
