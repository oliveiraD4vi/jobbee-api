// Imports
const express = require("express");
const cors = require("cors");
const app = express();

// App configuration
app.use(cors());
app.use(express.json());

// Required imports
require("dotenv/config");
require("./src/routes/index")(app);

// Server initialization
app.listen(process.env.PORT | 3000);
