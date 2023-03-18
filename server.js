// Imports
const connectDB = require("./src/models/database");
const express = require("express");
const cors = require("cors");

// Instances
const router = express.Router();
const app = express();

// App configuration
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Required imports
require("dotenv/config");
require("./src/routes/index")(router);

// Connection to DB
connectDB();

// Server initialization
app.listen(process.env.PORT | 3000);
