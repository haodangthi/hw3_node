const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Driver = require("../../models/driver");
const Truck = require("../../models/truck");
const router = express.Router();
let h = require("./helpers");

const secret = require("../../config/auth.json").secret;

router.post("/api/trucks", (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString();
  console.log(req.body.payload);
  let userID = h.getUserID(req.body.token); 
  saveToDB(
    createTruck(
      userID,
      req.body.type,
      req.body.payload,
      req.body.dimension,
      req.body.status,
      date
    ),
    res
  );
});

router.get("/api/trucks/:token", (req, res) => {
  let userID = h.getUserID(req.params.token);
  Truck.find({ created_by: userID }).then(trucks =>
    res.json({ status: "ok", trucks })
  );
});




router.get("/api/trucks",(req,res)=>{
  Truck.find({}).then(trucks=>{
    let filtered=trucks.filter(truck=>{
     return truck.status==='ON LOAD'&& truck.assigned_to==="nobody" 
    })
    res.json(filtered)
  })
})




router.delete("/api/trucks/:truckId", (req, res) => {
  Truck.findByIdAndDelete(req.params.truckId).then(truck => {
    let userId = truck.created_by;
    Truck.find({ created_by: userId }).then(trucks => {
      res.json({ trucks });
    });
  });
});

router.put("/api/trucks/:truckId", (req, res) => {
  
  Truck.findByIdAndUpdate(req.params.truckId, {
    status: req.body.status
    //assigned_to: req.body.assigned_to
      }).then(user => res.json({ status: "ok", user }));
});
router.put("/api/trucks/assign/:truckId", (req, res) => {
  
  Truck.findByIdAndUpdate(req.params.truckId, {
    
    assigned_to: req.body.assigned_to
      }).then(user => res.json({ status: "ok", user }));
});








function createTruck(driverID, type, payload, dimension, status, date) {
  return new Truck({
    truckType: type,
    payload: payload,
    dimension: dimension,
    status: status,
    created_by: driverID,
    assigned_to: "nobody",
    date: date
  });
}

function saveToDB(item, res) {
  item
    .save()
    .then(truck => {
      console.log("truck's been created");
      res.json({
        status: "created",
        truck
      });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
}

module.exports = router;
