const express = require("express");

const app = express();
const port = 8000;
const mongoose = require("mongoose");
//middleware, function when routes are hit
const bodyParser = require("body-parser");

const bookingModel = require("./routes/bookings");
const airlineModel = require("./routes/airlines");
const flightModel = require("./routes/flights");
const customerModel = require("./routes/customers");

const cors = require("cors");
require("dotenv/config");
app.use(bodyParser.json());

app.use(cors());

//use models

app.use("/customers", customerModel);
app.use("/airlines", airlineModel);
app.use("/bookings", bookingModel);
app.use("/flights", flightModel);

//connect to database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to port " + port)
);

app.listen(port);
