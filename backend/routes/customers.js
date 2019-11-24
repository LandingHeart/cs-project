const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "mynameis";
const Customer = require("../models/Customers");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:customerId", async (req, res) => {
  try {
    const customers = await Customer.findById(req.params.customerId);
    res.json(customers);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const customer = new Customer({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  });
  try {
    const saveCustomer = await customer.save();
    res.json(saveCustomer);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/api/register", async function(req, res) {
  const { firstname, lastname, username, password } = req.body;
  const user = new Customer({ firstname, lastname, username, password });
  user.save(function(err) {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!", user);
    }
  });
});

router.post("/api/auth", async (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  Customer.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "internal failure"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

router.delete("/:customerId", async (req, res) => {
  try {
    const removeCustomers = await Customer.remove({
      _id: req.params.customerId
    });
    res.json(removeCustomers);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
