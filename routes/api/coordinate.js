const express = require("express");
const router = express.Router();
const models = require("../../models");
const sharp = require("sharp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");

router.get("/api/coordinate", function (req, res) {
  models.coordinate.findAll().then(coordinate => res.json(coordinate));
});

router.get("/api/coordinate/:id", function (req, res) {
  models.coordinate.findByPk(req.params.id).then(coordinate => res.json(coordinate));
});

router.post("/api/coordinate", async (req, res) => {
  await console.log(req.body);

  await models.coordinate.create({
    image_id: null,
    original_image_id: null,
    max_x: req.body.max_x,
    max_y: req.body.max_y,
    min_x:req.body.min_x,
    min_y: req.body.min_y
  });

  await models.uploads.findOne({
    where: {
      file_name: req.body.image_name
    },
  }).then(function(upload) {
    coordinate.update({
      image_id: upload.id
    })
  })

  await models.originals.findOne({
    where: {
      file_name: req.body.original_image_id
    },
  }).then(function(originals) {
    coordinate.update({
      image_id: originals.id
    })
  })

  res.sendStatus(201);
});

module.exports = router;