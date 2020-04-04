const express = require("express");
const mongoose = require("mongoose");
const Driver = require("../../models/driver");
const Shipper = require("../../models/shipper");

const router = express.Router();
let h = require("./helpers");

router.get("/api/users/:token", (req, res) => {
  let isDriver = h.userIsDriver(req.params.token);
  let userType = h.defineType(isDriver);

  let userID = h.getUserID(req.params.token);
  userType
    .findById(userID)
    .then(user => res.json({ user }))
    .catch(e => console.log(e));
});

router.post("/api/users", (req, res) => {
  if (req.body.isDriver) {
    console.log("creating a driver");
    console.log(req.body.isDriver);
    const driver = createDriver(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.password
    );
    saveUserToDB(driver, res);
  } else {
    console.log("creating a shipper");
    console.log(req.body.isDriver);
    const shipper = createShipper(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.password
    );
    saveUserToDB(shipper, res);
  }
});

router.put("/api/users/:driverId", (req, res) => {
  Driver.findByIdAndUpdate(req.params.driverId, {
    isAssigned: req.body.isAssigned,
    assignedTruck: req.body.assignedTruck
  })
    .then(user => res.json({ status: "updated", user }))
    .catch(e => console.log(e));
});

router.put("/api/users/pass/:token", (req, res) => {
  let isDriver = h.userIsDriver(req.params.token);
  let userType = h.defineType(isDriver);
  let userID = h.getUserID(req.params.token);
  userType
    .findByIdAndUpdate(userID, {
      password: req.body.password
    })
    .then(user => res.json({ status: "user's password updated", user }))
    .catch(e => console.log(e));
});

router.delete("/api/users/:shipperId", (req, res) => {
  Shipper.findByIdAndDelete(req.params.shipperId)
    .then(user => res.json({ status: "user deleted ", user }))
    .catch(e => console.log(e));
});

function createDriver(name, surname, email, password) {
  return new Driver({
    name: name,
    surname: surname,
    email: email,
    password: password,
    isAssigned: false,
    assignedTruck: "",
    isDriver: true
  });
}

function createShipper(name, surname, email, password) {
  return new Shipper({
    name: name,
    surname: surname,
    email: email,
    password: password,
    isDriver: false
  });
}

function saveUserToDB(user, res) {
  user
    .save()
    .then(() => {
      res.json({
        status: "new user ok",
        user
      });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
}

module.exports = router;
