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
    const flights = await Flight.findById(req.params.customerId);
    res.json(flights);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/update", (req, res) => {
  try {
  } catch (err) {
    res.json({ msg: err });
  }
});

router.post("/admin/add", async (req, res) => {
  const flight = new Flight({
    airlineid: req.body.airlineid,
    airline: req.body.airline,
    flight: req.body.flight,
    capacity: req.body.capacity,
    fill: req.body.fill,
    arrival: req.body.arrival,
    departure: req.body.departure,
    time: req.body.time,
    fare: req.body.fare,
    date: req.body.date
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
