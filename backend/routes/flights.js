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
  const flight = req.body;
  Flight.findByIdAndUpdate({ _id: req.params.id }, flight)
    .then(function() {
      Flight.findOne({ _id: req.params.id }).then(function(flight) {
        res.send(flight);
      });
    })
    .catch(err => console.log(err));
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

router.post("/search", async (req, res) => {
  try {
    const obj = {
      flightid: req.body.flightid,
      airline: req.body.airline,
      airlineid: req.body.airlineid,
      flightname: req.body.flightname,
      date: req.body.date,
      time: req.body.time,
      capacity: req.body.capacity,
      filled: req.body.filled,
      depart: req.body.depart,
      dest: req.body.dest,
      fares: req.body.fares,
      status: req.body.status
    };

    const flights = await Flight.find();

    let our_flight = null;
    for (let i = 0; i < flights.length; i++) {
      let curr = flights[i];
      if (curr.flightid === obj.flightid) {
        our_flight = curr;
        break;
      }
    }

    const keys = Object.keys(our_flight);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (our_flight[key] !== obj[key]) {
        //THERE IS A DATA COHERENCE PROBLEM
        res.sendStatus(417);
        return;
      }
    }
    //ALL DATA IS GOOD
    res.sendStatus(200);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
