/* Default Module*/
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var compression = require("compression");
var helmet = require("helmet");
var cors = require("cors");
var bodyParser = require("body-parser");

/* Config */
var config = require("./config/config");
var mainSequelize = require("./models/index");

var app = express();

/* Modules Setup */
app.use(compression());
app.use(helmet());
app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mainSequelize.sequelize
  .sync()
  .then(() => {
    console.log("DB Connected!");
  })
  .catch(err => {
    console.log("DB Error : ", err);
  });

/* Router */
var routes = require("./routes/routes");
routes(app);

module.exports = app;
