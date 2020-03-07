const PhotoController = require("./controllers/photo");

const express = require("express");

const config = require("config");

const multer = require("multer");
const upload = multer({
  dest: config.upload_location,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

module.exports = function (app) {
  const apiRoutes = express.Router(),
    photoRoutes = express.Router();
  
  //=========================
  // Photo Routes
  //=========================

  // Set photo routes as subsection/middleware to apiRoutes
  apiRoutes.use("/photo", photoRoutes);

  photoRoutes.post("/", PhotoController.uploadPhoto);
  
  photoRoutes.get("/", PhotoController.getPhoto);

  // Set url for API section routes
  app.use("/api", apiRoutes);
};
