const connectDB = require("./config/database");
const express = require("express");
const cors = require("cors");

const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

require("dotenv/config");
require("./src/routes/index")(router);

connectDB();

app.listen(process.env.PORT | 3000);
