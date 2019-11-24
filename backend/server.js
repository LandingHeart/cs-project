const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const router = express.Router();

const port = 8000;
const mongoose = require("mongoose");
//middleware, function when routes are hit
const bodyParser = require("body-parser");

const bookingModel = require("./routes/bookings");
const airlineModel = require("./routes/airlines");
const flightModel = require("./routes/flights");
const customerModel = require("./routes/customers");

//middleware authentications
const withAuth = require('./middleware');

const cors = require("cors");
require("dotenv/config");
app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors());

//use models
router.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});
router.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

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
