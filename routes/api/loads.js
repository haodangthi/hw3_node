const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Load = require("../../models/load");
const router = express.Router();
let h = require("./helpers");
const secret = require("../../config/auth.json").secret;

router.get("/api/loads/:token", (req, res) => {
  let userID = h.getUserID(req.params.token);
  Load.find({ created_by: userID }).then((trucks) =>
    res.json({ status: "ok", trucks })
  );
});

router.get("/api/loads/assigned/:loadId", (req, res) => {
  Load.findById(req.params.loadId).then((load) => res.json(load));
});

router.post("/api/loads", (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString();
  console.log(req.body.dimension);
  let shipperId = h.getUserID(req.body.token);
  saveToDB(
    createLoad(
      shipperId,
      req.body.dimension,
      +req.body.payload,

      date
    ),
    res
  );
});

//assign load to truck
router.put("/api/loads/:loadId", (req, res) => {
  Load.findByIdAndUpdate(req.params.loadId, {
    state: req.body.state,
    status: req.body.status,
    assigned_to: req.body.assigned_to,
  }).then((user) => res.json({ status: "ok", user }));
});

router.put("/api/load/state/:loadId", (req, res) => {
  Load.findByIdAndUpdate(req.params.loadId, {
    state: req.body.state,
    status: req.body.status,
  }).then((load) => res.json({ status: "ok", load }));
});

router.delete("/api/loads/:loadId", (req, res) => {
  Load.findByIdAndDelete(req.params.loadId).then((load) => {
    let shipperId = load.created_by;
    Load.find({ created_by: shipperId }).then((trucks) => {
      res.json({ trucks });
    });
  });
});

function createLoad(shipperID, dimension, payload, date) {
  return new Load({
    payload: payload,
    dimension: dimension,
    status: "new",
    state: "NEW",
    created_by: shipperID,
    assigned_to: "nobody",
    message: "created",
    date: date,
  });
}

function saveToDB(item, res) {
  item
    .save()
    .then((truck) => {
      console.log("load's been created");
      res.json({
        status: "created",
        truck,
      });
    })
    .catch((e) => {
      res.status(500).json({ status: e.message });
    });
}

module.exports = router;
