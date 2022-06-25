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
  models.coordinate.findOne({
    where: {
      image_id: req.params.id
    }
  })    
    .then(coordinate => res.json(coordinate));
});

// router.get("/api/coordinate/:id", async (req, res) => {
//   let coordinateList = await models.coordinates.findAll({
//     where: {
//       image_id: req.params.id
//     },
//     include: [
//       {
//         model: models.images,
//         as: "coordinate"
//       }
//     ],
//     order: [
//       ['id', 'ASC']
//     ]
//   });

//   coordinateList = await Promise.all(
//     coordinateList.map(async coordinate => {
//       const [imageUrl] = await Promise.all([
//         getSignedUrl(coordinate.coordinate.bucket, coordinate.coordinate.key),
//       ])
//       return {
//         ...coordinate.toJSON(),
//         imageUrl,
//       }
//     })
//   );

//   res.send(coordinateList);
// });

router.post("/api/coordinate", async (req, res) => {
  await console.log(req.body);
  var var_image_id = null;
  var var_original_id = null;

  await models.originals.findOne({
    where: {
      file_name: req.body.original_image_name
    },
  }).then(function(original) {
    if (original !== null)
      var_original_id = original.dataValues.image_id;
  })

  await models.uploads.findOne({
    where: {
      file_name: req.body.image_name
    },
  }).then(function(upload) {
    console.log(upload);
    if (upload !== null) {
      if (var_original_id !== null) {
        upload.update({
          original_image_id : var_original_id
        })
      }
      var_image_id = upload.dataValues.image_id;
    }
      
  })

  await models.coordinate.create({
    image_id: var_image_id,
    original_image_id: var_original_id,
    max_x: req.body.max_x,
    max_y: req.body.max_y,
    min_x:req.body.min_x,
    min_y: req.body.min_y
  });

  res.sendStatus(201);
});

module.exports = router;