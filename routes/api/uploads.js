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

const S3_BUCKET = "medi-image-bucket-aws"

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: count, rows: rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);
  return { count, rows, totalPages, currentPage };
};

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

router.get("/api/uploads", async (req, res) => {
  const { page, size, title } = req.query;
  const { limit, offset } = getPagination(page, size);
  let uploadList = await models.uploads.findAndCountAll({
    limit:limit,
    offset:offset,
    include: [
      {
        model: models.images,
        as: "image"
      },
      {
        model: models.images,
        as: "thumbnail"
      }
    ],
    order: [
      ['id', 'ASC']
    ]
  });
  uploadList.rows = await Promise.all(
    uploadList.rows.map(async upload => {
      const [imageUrl, thumbnailUrl] = await Promise.all([
        getSignedUrl(upload.image.bucket, upload.image.key),
        getSignedUrl(upload.thumbnail.bucket, upload.thumbnail.key),
      ])
      return {
        ...upload.toJSON(),
        imageUrl,
        thumbnailUrl
      }
    })
  );

  const response = getPagingData(uploadList,page,limit)
  res.send(response);
});

router.get("/api/uploads/unannotated", async (req, res) => {
  const { page, size, title } = req.query;
  const { limit, offset } = getPagination(page, size);
  let uploadList = await models.uploads.findAndCountAll({
    limit:limit,
    offset:offset,
    where: {
      ground_truth: null,
    },
    include: [
      {
        model: models.images,
        as: "image"
      },
      {
        model: models.images,
        as: "thumbnail"
      }
    ],
    order: [
      ['id', 'ASC']
    ]
  });


  uploadList.rows = await Promise.all(
    uploadList.rows.map(async upload => {
      const [imageUrl, thumbnailUrl] = await Promise.all([
        getSignedUrl(upload.image.bucket, upload.image.key),
        getSignedUrl(upload.thumbnail.bucket, upload.thumbnail.key),
      ])
      
      return {
        ...upload.toJSON(),
        imageUrl,
        thumbnailUrl
      }
    })
  );

  const response = getPagingData(uploadList,page,limit)
  res.send(response);
});

const { Op } = require("sequelize");
router.get("/api/uploads/annotated", async (req, res) => {
  const { page, size, title } = req.query;
  const limit = 500;
  const offset = 0;
  let uploadList = await models.uploads.findAndCountAll({
    limit:limit,
    offset:offset,
    where: {
      ground_truth: {
        [Op.not]: null
      },
    },
    include: [
      {
        model: models.images,
        as: "image"
      },
      {
        model: models.images,
        as: "thumbnail"
      }
    ],
    order: [
      ['id', 'ASC']
    ]
  });

  uploadList.rows = await Promise.all(
    uploadList.rows.map(async upload => {
      const [imageUrl, thumbnailUrl] = await Promise.all([
        getSignedUrl(upload.image.bucket, upload.image.key),
        getSignedUrl(upload.thumbnail.bucket, upload.thumbnail.key),
      ])
      
      return {
        ...upload.toJSON(),
        imageUrl,
        thumbnailUrl
      }
    })
  );

  const response = getPagingData(uploadList,page,limit)
  res.send(response);
});

router.post("/api/uploads", upload.single('image'), async (req, res) => {
  const id = uuidv4();
  const thumbnailId = uuidv4()
  const thumbnail = await sharp(req.file.buffer)
    .resize(200)
    .toBuffer();

  await Promise.all([
    uploadToS3(`images/${id}`, req.file.buffer, req.file.mimetype),
    uploadToS3(`thumbnails/${thumbnailId}`, thumbnail, req.file.mimetype),
  ]);

  await Promise.all([
    models.images.create({
      id,
      bucket: S3_BUCKET,
      key: `images/${id}`
    }),
    models.images.create({
      id: thumbnailId,
      bucket: S3_BUCKET,
      key: `thumbnails/${thumbnailId}`
    }),
  ]);

  await models.uploads.create({
    file_name: req.file.originalname,
    image_id: id,
    is_verified: false,
    thumbnail_id: thumbnailId,
    max_x: null,
    max_y: null,
    min_x: null,
    min_y: null
  });
  res.sendStatus(201);
});

router.put("/api/uploads/:id",  async (req, res) => {
  models.uploads.findByPk(req.params.id).then(function(up) {
    up.update({
      ground_truth: req.body.ground_truth,
      confidence: req.body.confidence,
      is_verified: req.body.is_verified,
    }).then((note) => {
      res.json(note);
    });
  });
});

router.put("/api/uploads/coordinate", async (req, res) => {
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
          original_image_id : var_original_id,
          max_x: req.body.max_x,
          max_y: req.body.max_y,
          min_x:req.body.min_x,
          min_y: req.body.min_y
        })
      }
    }
  })
});

module.exports = router;