const express = require("express");
const router = express.Router();
const Airport = require("../models/Airports");

router.get("/", async (req, res) => {
  try {
    const airport = await Airport.find();
    res.json(airport);
  } catch (err) {
    res.json({ message: error });
  }
});

router.get("/:airportid", async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.airportid);
    res.json(airport);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/add", async (req, res) => {
  const airport = new Airport({
    airport: req.body.airport,
    description: req.body.description
  });

  try {
    const savedAirport = await airport.save();
    res.json(savedAirport);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:airportid", async (req, res) => {
  try {
    const removeAirport = await Flight.remove({ _id: req.params.airportid });
    res.json(removeAirport);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
