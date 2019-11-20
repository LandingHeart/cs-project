const express = require("express");

const router = express.Router();

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
    email: req.body.email,
    password: req.body.password
  });
  try {
    const saveCustomer = await customer.save();
    res.json(saveCustomer);
  } catch (err) {
    res.json({ message: err });
  }
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