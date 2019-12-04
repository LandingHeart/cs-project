const express = require("express");
const router = express.Router();
const Airline = require("../models/Airlines");

router.get("/", async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.json(airlines);
  } catch (err) {
    res.json({ message: error });
  }
});

router.get("/:airlineId", async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.airlineId);
    res.json(airline);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const airline = new Airline({
    arilinename: req.body.airlinename,
    airlineid: req.body.airlineid,
  });

  try {
    const savedAirline = await airline.save();
    res.json(savedAirline);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:airlineId", async (req, res) => {
  try {
    const removeAirline = await Flight.remove({ _id: req.params.airlineId });
    res.json(removeAirline);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
