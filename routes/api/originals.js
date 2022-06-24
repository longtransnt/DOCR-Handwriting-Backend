const express = require("express");
const router = express.Router();
const models = require("../../models");
const sharp = require("sharp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");
const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: 'us-west-2'
});

const S3_BUCKET = "medi-image-bucket"

function getSignedUrl(bucket, key, expires = 3600) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "getObject",
      {
        Bucket: bucket,
        Key: key,
        Expires: expires
      },
      function (err, url) {
        if (err) throw new Error(err);

        resolve(url);
      }
    );
  });
}

async function uploadToS3(key, buffer, mimetype) {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: S3_BUCKET,
        ContentType: mimetype,
        Key: key,
        Body: buffer
      },
      () => resolve()
    );
  });
}

router.get("/api/originals", function(req, res) {
  return []
}); 

router.get("/api/originals/:id", async (req, res) => {
  let originalList = await models.originals.findAll({
    where: {
      image_id: req.params.id
    },
    include: [
      {
        model: models.images,
        as: "image_original"
      }
    ],
    order: [
      ['id', 'ASC']
    ]
  });

  originalList = await Promise.all(
    originalList.map(async original => {
      const [imageUrl] = await Promise.all([
        getSignedUrl(original.image_original.bucket, original.image_original.key),
      ])
      return {
        ...original.toJSON(),
        imageUrl,
      }
    })
  );

  res.send(originalList);
});

// router.get("", async (req, res) => {
  
//   models.images.findByPk(req.params.id)
//   .then(
//     (original) => {
//       getSignedUrl(original.image.bucket, original.image.key),
//       res.json(original)
//     }
//   );
// });

router.post("/api/originals", upload.single('image'), async (req, res) => {
    const id = uuidv4();
    
    await Promise.all([
      uploadToS3(`originals/${id}`, req.file.buffer, req.file.mimetype),
    ]);
  
    await Promise.all([
      models.images.create({
        id,
        bucket: S3_BUCKET,
        key: `originals/${id}`
      })
    ]);
  
    await models.originals.create({
      image_id: id,
      file_name: req.file.originalname,
      csv_name: req.file.originalname,
    });
    res.sendStatus(201);
  });

  module.exports = router;