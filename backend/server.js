const express = require("express");

const app = express();

const mongoose = require("mongoose");
//middleware, function when routes are hit
const bodyParser = require("body-parser");

const cors = require("cors");
require("dotenv/config");
app.use(bodyParser.json());

app.use(cors());

//connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("connected")
);

app.listen(3000);
