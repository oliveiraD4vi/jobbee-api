exports.uncaughtException = (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
};

exports.unhandledRejection = (err, server) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
};
