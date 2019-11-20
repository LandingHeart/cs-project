const express = require("express");

const app = express();
const port = 3000;
const mongoose = require("mongoose");
//middleware, function when routes are hit
const bodyParser = require("body-parser");

const bookingModel = require("./routes/bookings");
const airlineModel = require("./routes/airlines");

const customerModel = require("./routes/customers");

const cors = require("cors");
require("dotenv/config");
app.use(bodyParser.json());

app.use(cors());

//use models

app.use(customerModel);
app.use(airlineModel);
app.use(bookingModel);

//connect to database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to port " + port)
);

app.listen(port);
