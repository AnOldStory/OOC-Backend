var express = require("express");
var router = express.Router();

/* Json Web Token */
var jwt = require("../utils/jwt");

/* DB */
var db = require("./database");

/* Main page */
router.get("/", (req, res, next) => {
  // console.log(req.query);
  // req.query.id = 1;
  let validation = true;
  if (!req.query.id) {
    /* Check if the request has right parameter */
    validation = false;
  }
  if (validation) {
    db.getCinemaById(req.query.id, (err, result) => {
      if (err) {
        /* TODO : Error Handling */
        next();
      } else {
        console.log("hello");
        res.json(result);
      }
    });
  } else {
    /* TODO : Parameter Error Handleing */
    next();
  }
});

router.get("/token/enc", (req, res, next) => {
  if (req.query.value) {
    jwt.encryption({ foo: req.query.value }, (err, token) => {
      if (err) {
        console.log(err);
        next();
      } else {
        res.json(token);
      }
    });
  } else {
    next();
  }
});

router.get("/token/dec", (req, res, next) => {
  jwt.decryption(req.query.token, (err, value) => {
    if (err) {
      console.log(err);
      next();
    } else {
      res.json(value);
    }
  });
});

module.exports = router;
