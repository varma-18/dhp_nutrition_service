const createError = require("http-errors");

//Handling error for invalid api requests
const notFound = (req, res, next) => {
  const error = new Error(
    `Not Found ${req.originalUrl} ,Are you supposed to be here??👀👀`
  );

  next(createError.NotFound("This route doesn't exist"));
};

const errorHandler = (error, req, res, next) => {
  console.log(error);
  //check the status code of the error messages and set response status
  res.status(error.status || 500);

  //Send the error message
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
      stack:
        process.env.NODE_ENV === "development"
          ? error.stack.split("\n")[0]
          : null,
    },
  });
};

module.exports = { errorHandler, notFound };
