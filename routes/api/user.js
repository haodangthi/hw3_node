const express = require("express");
const mongoose = require("mongoose");
const Driver = require("../../models/driver");
const Shipper = require("../../models/shipper");

const router = express.Router();
const h = require("./helpers");

router.get("/api/users/:token", (req, res) => {
  const isDriver = h.userIsDriver(req.params.token);
  const userType = h.defineType(isDriver);

  const userID = h.getUserID(req.params.token);
  userType
    .findById(userID)
    .then((user) => res.json({ user }))
    .catch((e) => console.log(e));
});

router.post("/api/users", (req, res) => {
  const userType = h.defineType(req.body.isDriver);
  return findByEmail(userType,req.body.email).then(user=>{
    if (!user){createUser(req,res)} else{
      console.log("There is a user with the same email")
      throw new Error()
    }
  })
});

router.put("/api/users/:driverId", (req, res) => {
  Driver.findByIdAndUpdate(req.params.driverId, {
    isAssigned: req.body.isAssigned,
    assignedTruck: req.body.assignedTruck,
  })
    .then((user) => res.json({ status: "updated", user }))
    .catch((e) => console.log(e));
});

router.put("/api/users/pass/:token", (req, res) => {
  const isDriver = h.userIsDriver(req.params.token);
  const userType = h.defineType(isDriver);
  const userID = h.getUserID(req.params.token);
  userType
    .findByIdAndUpdate(userID, {
      password: req.body.password,
    })
    .then((user) => res.json({ status: "user's password updated", user }))
    .catch((e) => console.log(e));
});

router.delete("/api/users/:shipperId", (req, res) => {
  Shipper.findByIdAndDelete(req.params.shipperId)
    .then((user) => res.json({ status: "user deleted ", user }))
    .catch((e) => console.log(e));
});

function createDriver(name, surname, email, password) {
  return new Driver({
    name: name,
    surname: surname,
    email: email,
    password: password,
    isAssigned: false,
    assignedTruck: "",
    isDriver: true,
  });
}

function createShipper(name, surname, email, password) {
  return new Shipper({
    name: name,
    surname: surname,
    email: email,
    password: password,
    isDriver: false,
  });
}

function saveUserToDB(user, res) {
  user
    .save()
    .then(() => {
      res.json({
        status: "new user ok",
        user,
      });
    })
    .catch((e) => {
      res.status(500).json({ status: e.message });
    });
}

function findUser(userType, email) {
  return userType.findOne({ email: email });
}

function createUser(req,res){
  if (req.body.isDriver) {
    console.log("creating a driver");
    
    const driver = createDriver(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.password
    );
    saveUserToDB(driver, res);
  } else {
    console.log("creating a shipper");
    
    const shipper = createShipper(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.password
    );
    saveUserToDB(shipper, res);
  }

}

function findByEmail(userType,email){
  return userType.findOne({email:email}).then(res=>
    res
 ).catch(e => {
   console.log("User is not found");
   res.status(401).json();
 });
}

module.exports = router;
