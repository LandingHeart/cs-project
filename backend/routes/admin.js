const express = require("express");

const router = express.Router();
const Admin = require("../models/Admin");

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
  const { username, password } = req.body;
  
  Admin.findOne({ username }, (err, user) => {
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
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
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
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
