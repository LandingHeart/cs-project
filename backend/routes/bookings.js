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


router.post("/", async (req, res) => {
  const booking = new Booking({
    bookedBy: req.body.bookedBy,
    flightId: req.body.flightId,
    flightName: req.body.flightName,
    id: req.body.id
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
