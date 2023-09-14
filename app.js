const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cors = require("cors");

const app = express();

const { errorHandler } = require("./middlewares/error_handlers");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));

// routers
app.use("/api", require("./routes/conversations"));
app.use("/api/messages", require("./routes/messages"));

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

// Telling the app to listen on specified PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
