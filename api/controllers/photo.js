const fs = require("fs");
const config = require("config");
const sharp = require("sharp");
const path = require("path");
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

exports.uploadPhoto = function(req, res, next) {
  if (!fs.existsSync(config.photo_location)) {
    fs.mkdirSync(config.photo_location);
  }

  if (req.file) {
    const source_file = config.upload_location + req.file.filename;
    const dest_file_name =
      config.photo_location.replace(/\/?$/, "/") + req.file.filename;
    sharp(source_file)
      .toFile(dest_file_name)
      .then(data => {
        imagemin([dest_file_name], {
          destination: config.photo_location,
          plugins: [imageminWebp({ quality: 85 })]
        })
          .then(data => {
            res.status(200).json({
              message: "Photo has been uploaded and processed successfully",
              photo_file_name: req.file.originalname
            });
          })
          .catch(err => {
            res.send({
              error: err
            });
            return next(err);
          });
      })
      .catch(err => {
        res.send({
          error: err
        });
        return next(err);
      });
  }
};

exports.getPhoto = function(req, res, next) {

  if (!fs.existsSync(config.photo_location)) {
    fs.mkdirSync(config.photo_location);
  }
  if (req.query.photoUrl) {
    res.set("Cache-Control", "public, max-age=31557600, s-maxage=31557600");
    const photoUrl = decodeURIComponent(req.query.photoUrl);
    const fileName = config.photo_location.replace(/\/?$/, "/") + photoUrl;
    if (!fs.existsSync(fileName)) {
      return res.status(404).json({
        message: `${fileName} does not exist`
      });
    } else {
      fs.readFile(fileName, function(err, data) {
        console.log(err)
        if (err) throw err;
        return res.end(data, "binary");
      });
  
    }
  } else {
    fs.readdir(config.photo_location, (err, files) => {
      if (err) throw err;

      const jpg_files = [];
      files.forEach(file => {
        if (fs.lstatSync(path.join(config.photo_location, file)).isFile()) {
          if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
            jpg_files.push(file);
          }
        }
      });

      return res.status(200).json({
        photoUrls: jpg_files
      });
    });
  }
};
