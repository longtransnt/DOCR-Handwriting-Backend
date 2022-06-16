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