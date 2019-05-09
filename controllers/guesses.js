const express = require("express");
const router = express.Router();
const { Guess, Like } = require("../models");
const { authMiddleware } = require("./auth");
const Sequelize = require("sequelize");
// let config = null
// config = process.env.NODE_ENV !== "production" ? require("../.env") : null

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2"
});

const s3 = new AWS.S3();

const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "godsamongmen-guesses",
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
// create a guess
router.post(
  "/",
  authMiddleware,
  imageUpload.fields([{ name: "picture" }, { name: "text" }]),
  (req, res) => {
    const supportedContentTypes = ["image/gif", "image/jpeg", "image/png"];
    const { location, mimetype } = req.files.picture[0];
    const { text, targetId } = req.body;
    const { id } = req.user;

    if (!supportedContentTypes.includes(mimetype)) {
      res.status(415).send({ error: "Filetype not supported." });
      return;
    }

    Guess.create(
      {
        text: text,
        userId: id,
        pictureURL: location,
        pictureContentType: mimetype,
        targetId: targetId
      },
      { where: { id } }
    )
      .then(newGuess => {
        res.set({ "Content-Location": `/guesses/${newGuess.id}` });
        res.send({ newGuess });
      })
      .catch(err => {
        // console.log(err)
        if (err instanceof Sequelize.ValidationError) {
          return res.status(400).send({ errors: err.errors });
        }
        res.status(500).send();
      });
  }
);

// read all guesses
router.get("/", (req, res) => {
  Guess.findAll({
    include: [
      {
        model: Like
      }
    ],
    limit: req.query.limit || 100,
    offset: req.query.offset || 0,
    order: [["createdAt", "DESC"]]
  }).then(guesses => res.send({ guesses }));
});

// read guess by id
router.get("/:id", (req, res) => {
  Guess.findById(req.params.id, {
    include: [Like]
  }).then(guess => res.json({ guess }));
});

// update guess by id
router.patch("/:id", authMiddleware, (req, res) => {
  Guess.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(guess => res.json({ guess }));
});

// delete guess
router.delete("/:id", authMiddleware, (req, res) => {
  Guess.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  }).then(destroyedCount => {
    if (destroyedCount === 0) {
      return res.status(400).send({ error: "guess does not exist" });
    }
    res.json({ id: req.params.id });
  });
});

module.exports = router;
