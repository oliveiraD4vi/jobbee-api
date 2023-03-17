// Imports
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();

// App configuration
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Required imports
require("dotenv/config");
require("./src/routes/index")(router);

// Server initialization
app.listen(process.env.PORT | 3000);
