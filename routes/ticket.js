var express = require("express");
var router = express.Router();
// const db = require("./database");
const loginDb = require("./database/logDb");
const ticketDb = require("./database/ticketDb");


router.get("/", (req, res, next) => {
  if (req.body.token) {
    jwt.decryption(req.query.token, (err, value) => {
      if (err) {
        console.log(err);
        console.log("surprise3!");
        next();
      } else {
        loginDb.getUserbyId(value, (err, result) => {
          if (err) {
            console.log(err);
            console.log("at /ticket getuserbyid");
            next();
          } else if (result[0]) {
              ticketDb.getTicketById(result[0].customerId, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              })
          } else {
            console.log("search failed");
            next();
          }
        });
      }
    });
  } else {
    next();
  }
});
  
module.exports = router;
  