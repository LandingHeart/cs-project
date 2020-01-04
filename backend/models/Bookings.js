const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  customer: {
    tyep: String,
    require: true
  },
  flightid: {
    type: Number,
    require: true
  },
  id: {
    type: Number,
    require: true
  },
  bookedFrom: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("bookings", BookingSchema);
