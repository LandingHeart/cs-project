const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    booked: String,
    date:{
        type: Date,
        default: Date.now
    }
})

const CustomersSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      bookings:{
          flightId: String, 
      }
})

module.exports = mongoose.model("customers", CustomersSchema);

