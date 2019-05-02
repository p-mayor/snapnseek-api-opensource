const express = require("express");
const router = express.Router();
const { Target } = require("../models");
const { authMiddleware } = require("./auth");
// const Sequelize = require("sequelize")
let config = null;
config = process.env.NODE_ENV !== "production" ? require("../.env") : null;

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || config.AWS_ACCESS_KEY,
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY || config.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2"
});

const s3 = new AWS.S3();

const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "godsamongmen-targets",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      const filename = `${Date.now().toString()}-${file.originalname}`;
      cb(null, filename);
    }
  })
});

//create new target

router.post(
  "/",
  authMiddleware,
  imageUpload.fields([{ name: "picture" }, { name: "text" }]),
  (req, res) => {
    console.log(req);
    const supportedContentTypes = ["image/gif", "image/jpeg", "image/png"];
    const { location, mimetype } = req.files.picture[0];
    const { text, title, neighborhood } = req.body;

    const { id } = req.user;

    if (!supportedContentTypes.includes(mimetype)) {
      res.status(415).send();
      return;
    }

    Target.scope("target")
      .create(
        {
          pictureURL: location,
          pictureContentType: mimetype,
          text: text,
          userId: id,
          title: title,
          neighborhood: neighborhood
        },

        { where: { id } }
      )
      .then(newTarget => {
        res.set({ "Content-Location": `/target/${newTarget.id}` });
        res.send({ newTarget });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send();
      });
  }
);

// get list of targets
router.get("/", (req, res) => {
  Target.findAll({
    limit: req.query.limit || 100,
    offset: req.query.offset || 0,
    order: [["createdAt", "DESC"]]
  }).then(targets => {
    res.json({ targets });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Target.scope("target")
    .findById(id)
    .then(target => {
      // if (target === null || target.pictureURL === null) {
      if (target === null) {
        return res.status(404).send();
      }
      // const { picture, pictureContentType } = target
      // res.set({
      //     "Content-Type": pictureContentType,
      //     "Content-Disposition": "inline"
      // })
      console.log("testing GET");
      // console.log({target})
      res.send({ target });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
});

module.exports = router;
