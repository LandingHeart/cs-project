const express = require("express");

const router = express.Router();

const Flight = require("../models/Flights");

router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:flightId", async (req, res) => {
  try {
    const flights = await Flight.findById(req.params.flightId);
    res.json(flights);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/update/:id", function(req, res) {
  Flight.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Flight.findOne({ _id: req.params.id }).then(function(flight) {
      res.send(flight);
    });
  });
});

router.post("/admin/add", async (req, res) => {
  const flight = new Flight({
    airlineid: req.body.airlineid,
    airline: req.body.airline,
    flight: req.body.flight,
    capacity: req.body.capacity,
    filled: req.body.filled,
    dest: req.body.dest,
    departure: req.body.departure,
    time: req.body.time,
    fare: req.body.fare,
    date: req.body.date,
    status: req.body.status
  });
  try {
    const saveFlight = await flight.save();
    res.json(saveFlight);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:flightId", async (req, res) => {
  try {
    const removeFlight = await Flight.remove({
      _id: req.params.flightId
    });
    res.json(removeFlight);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
