const errorMiddleware = require("./src/middlewares/errors");
const ErrorHandler = require("./src/utils/errorHandler");
const connectDB = require("./config/database");
const express = require("express");
const cors = require("cors");

const router = express.Router();
const app = express();

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} Route Not Found`, 404));
});
app.use(errorMiddleware);

require("dotenv/config");
require("./src/routes/index")(router);

connectDB();

const server = app.listen(process.env.PORT | 3000);

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
