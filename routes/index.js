var express = require("express");
var router = express.Router();

/* DB */
var db = require("./database");

/* Main page */
router.get("/", (req, res, next) => {
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

module.exports = router;
