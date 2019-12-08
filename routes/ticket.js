var express = require("express");
var router = express.Router();
// const db = require("./database");
const loginDb = require("./database/loginDb");
const ticketDb = require("./database/ticketDb");
const jwt = require("../utils/jwt");


router.get("/", (req, res, next) => {
  console.log(req.query.token)
  console.log(req.query.seats)
  if (Object.keys(req.query).length === 1) {
    if (req.query.token) {
      jwt.decryption(req.query.token, (err, value) => {
        if (err) {
          console.log(err);
          console.log("surprise3!");
          next();
        } else {
          console.log(value)
          console.log(value.user)
          loginDb.getUserbyId(value.user, (err, result) => {
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
  } else if (Object.keys(req.query).length === 2) {
    if (req.query.token && req.query.tickets) {
      jwt.decryption(req.query.token, (err, value) => {
        if (err) {
          console.log(err);
          console.log("surprise3!");
          next();
        } else {
          console.log(value.user)
          loginDb.getUserbyId(value.user, (err, result) => {
            if (err) {
              console.log(err);
              console.log("at /ticket getuserbyid");
              next();
            } else if (result[0]) {
              const givenTickets = req.query.tickets.split(",");
                ticketDb.deleteTickets(givenTickets, (err, result) => {
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
  } else {
    next();
  }
});
  
module.exports = router;
  