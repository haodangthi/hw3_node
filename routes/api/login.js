const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
let h = require("./helpers");
const Driver = require("../../models/driver");
const Shipper = require("../../models/shipper");
const secret = require("../../config/auth.json").secret;
const router = express.Router();

router.post("/api/auth/login", (req, res) => {
  let { isDriver, email, password } = req.body;
  let userType = h.defineType(isDriver);

  findUser(userType, email, password)
    .then((user) => {
      if (!user || user.isDriver !== isDriver) {
        console.log("No user");
        throw new Error();
      } else {
        console.log(user);
        let jwt_token = jwt.sign(JSON.stringify(user), secret);
        res.json({ jwt_token });
      }
    })
    .catch((e) => {
      console.log("User is not found");
      res.status(401).json();
    });
});

function findUser(userType, email, password) {
  return userType.findOne({ email: email, password: password });
}

module.exports = router;
