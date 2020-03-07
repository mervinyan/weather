const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  config = require("config"),
  router= require('./router');

const fs = require('fs');

const chalk = require("chalk");

const server = app.listen(config.port, () => {
  console.log(chalk.green("API is running on port " + config.port + "."));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger("dev"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header(
    "Access-Control-Allow-Methods",
    "PATCH, PUT, GET, POST, DELETE, OPTIONS"
  );

  next();
});

router(app);

if (!fs.existsSync(config.upload_location)) {
  fs.mkdirSync(config.upload_location);
}

module.exports = server;
