var express = require("express");
var router = express.Router();

/* Json Web Token */
var jwt = require("../utils/jwt");

/* DB */
// var db = require("./[reserve]database");

/* Main page */
router.get("/", (req, res, next) => {
  console.log("surprise10!");
  if (validation) {
    
  } else {
    /* TODO : Parameter Error Handleing */
    console.log("surprise!");
    //next();
  }
});

router.get("/token/enc", (req, res, next) => {
  if (req.query.value) {
    jwt.encryption({ foo: req.query.value }, (err, token) => {
      if (err) {
        console.log(err);
        console.log("surprise1!");
        //next();
      } else {
        res.json(token);
      }
    });
  } else {
    console.log("surprise2!");
    //next();
  }
});

router.get("/token/dec", (req, res, next) => {
  jwt.decryption(req.query.token, (err, value) => {
    if (err) {
      console.log(err);
      console.log("surprise3!");
      //next();
    } else {
      res.json(value);
    }
  });
});

module.exports = router;
