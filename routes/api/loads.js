const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Driver = require("../../models/driver");
const Load = require("../../models/load");
const router = express.Router();
let h = require("./helpers");
const secret = require("../../config/auth.json").secret;

router.get("/api/loads/:token", (req, res) => {
  let userID = h.getUserID(req.params.token);
  Load.find({ created_by: userID }).then(trucks =>
    res.json({ status: "ok", trucks })
  );
});

router.post("/api/loads", (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString();
  console.log(req.body.payload);
  let shipperId = h.getUserID(req.body.token);
  saveToDB(
    createTruck(
      shipperId,
      req.body.width,
      req.body.length,
      req.body.heigth,
      req.body.payload,

      date
    ),
    res
  );
});

router.put("/api/loads/:loadId", (req, res) => {
  Load.findByIdAndUpdate(req.params.loadId, {
    status: req.body.status,
    assigned_to: req.body.assigned_to
  }).then(user => res.json({ status: "ok", user }));
});


router.delete("/api/loads/:loadId", (req, res) => {
  Load.findByIdAndDelete(req.params.loadId).then(load => {
    let shipperId = load.created_by;
    Truck.find({ created_by: shipperId }).then(trucks => {
      res.json({ trucks });
    });
  });
});

function createLoad(shipperID, width, length, heigth, payload, date) {
  return new Load({
    payload: payload,
    dimension: { width, length, heigth },
    status: status,
    state: "NEW",
    created_by: shipperID,
    assigned_to: "nobody",
    message: "",
    date: date
  });
}

function saveToDB(item, res) {
  item
    .save()
    .then(truck => {
      console.log("load's been created");
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
