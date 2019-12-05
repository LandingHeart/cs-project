const express = require("express");

const router = express.Router();

const Booking = require("../models/Bookings");

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.json({ message: error });
  }
});

router.get("/:bookingId", async (req, res) => {
  try {
    const bookings = await Booking.findById(req.params.bookingId);
    res.json(bookings);
  } catch (err) {
    res.json({ message: error });
  }
});

//route to pass in the customerid and find
// {this.state.customerName}
router.get("/:customerid", async (req, res) => {
  try {
    const customerId = Booking.findById(req.params.customerId);
    res.json(customerId);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.put("/update/:id", async (req, res) => {
  Booking.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Booking.findOne({ id: req.params.id }).then(function(booking) {
      res.send({ booking });
    });
  });
});

router.post("/", async (req, res) => {
  const booking = new Booking({
    customer: req.body.customer,
    flightid: req.body.flightid,
    flightName: req.body.flightName,
    id: req.body.id,
    bookedFrom: req.body.bookedFrom
  });

  try {
    const savedBooking = await booking.save();
    res.json(savedBooking);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:bookingId", async (req, res) => {
  try {
    const removebookings = await Booking.remove({
      _id: req.params.bookingId
    });
    res.json(removebookings);
  } catch (err) {
    res.json({ message: error });
  }
});

module.exports = router;
