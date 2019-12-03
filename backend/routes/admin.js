const express = require("express");
const secret = "mynameis";

const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    res.json({ message: error });
  }
});

router.post("/add", async (req, res) => {
  const { airline, username, password } = req.body;
  const admin = new Admin({
    airline,
    username,
    password
  });
  try {
    const saveAdmin = await admin.save();
    res.json(saveAdmin);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/api/auth", async (req, res) => {
  const { airline, username, password } = req.body;
  console.log("error message");
  Admin.findOne({ username }, (err, user) => {
    console.log(username);
    console.log("BEGINNING");
    console.log(user);
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "internal failure"
      });
    } else if (!user) {
      console.log("sever err");
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      console.log("REACH ELSE");
      user.isCorrectPassword(password, function(err, same) {
        console.log("password" + password);
        if (err) {
          console.log(err);
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          console.log("401");
          res.status(401).json({
            error: "Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          // res.cookie("token", token, { httpOnly: true }).sendStatus(200);
          console.log("SENDING USER");
          console.log(user);
          res.status(200).json(user);
        }
      });
    }
  });
});

module.exports = router;
