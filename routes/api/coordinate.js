const express = require("express");
const router = express.Router();
const models = require("../../models");
const sharp = require("sharp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");
const Coordinate = models.coordinate;


router.get("/api/coordinate", function (req, res) {
  Coordinate.findAll().then(coordinate => res.json(coordinate));
});

router.post("/api/coordinate", function (req, res) {
  var body = req.body;

  res.send (body);
  // Coordinate.create({ coordinate: req.body.note, tag: req.body.tag }).then(function(note) {
  //   res.json(note);
  // });
});

module.exports = router;