var express = require("express");
var router = express.Router();
// const db = require("./database");
const db = require("./database/bookDb");
const loginDb = require("./database/loginDb")
const jwt = require("../utils/jwt");

router.get("/", (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    db.getSchedules((err, result) => {
      if (err) {
        next();
      } else {
        console.log("hello\n======================================");
        res.json(result);
      }
    });
  } else if (Object.keys(req.query).length === 1) {
    if (req.query.movie) {
      db.getSchedulesbyMovie(req.query.movie, (err, result) => {
        if (err) {
          console.log(err);
          next();
        } else {
          console.log("hello\n===========================");
          res.json(result);
        }
      });
    } else if (req.query.cinema) {
      db.getSchedulesbyCinema(req.query.cinema, (err, result) => {
        if (err) {
          console.log(err);
          next();
        } else {
          console.log("hello\n===========================");
          res.json(result);
        }
      });
    } else {
      db.getSchedulesbyDate(req.query.date, (err, result) => {
        if (err) {
          console.log(err);
          next();
        } else {
          console.log("hello\n===========================");
          res.json(result);
        }
      });
    }
  } else if (Object.keys(req.query).length === 2) {
    if (req.query.movie && req.query.cinema) {
      db.getSchedulesbyCinemaMovie(
        req.query.cinema,
        req.query.movie,
        (err, result) => {
          if (err) {
            console.log(err);
            next();
          } else {
            console.log("hello\n===========================");
            res.json(result);
          }
        }
      );
    } else if (req.query.cinema && req.query.date) {
      db.getSchedulesbyCinemaDate(
        req.query.cinema,
        req.query.date,
        (err, result) => {
          if (err) {
            console.log(err);
            next();
          } else {
            console.log("hello\n===========================");
            res.json(result);
          }
        }
      );
    } else if (req.query.movie && req.query.date) {
      db.getSchedulesbyMovieDate(
        req.query.movie,
        req.query.date,
        (err, result) => {
          if (err) {
            console.log(err);
            next();
          } else {
            console.log("hello\n===========================");
            res.json(result);
          }
        }
      );
    }
  } else if (req.query.movie && req.query.date && req.query.cinema) {
    db.getSchedulesbyCinemaMovieDate(
      req.query.cinema,
      req.query.movie,
      req.query.date,
      (err, result) => {
        if (err) {
          console.log(err);
          next();
        } else {
          console.log("hello\n===========================");
          res.json(result);
        }
      }
    );
  } else if (req.query.movie && req.query.date && req.query.cinema && req.query.time) {
    db.getTicketsTaken(
      req.query.cinema,
      req.query.movie,
      req.query.date,
      req.query.time,
      (err, result) => {
        if (err) {
          next();
        } else {
          console.log("hello");
          res.json(result);
        }
      }
    );
  } else if (req.query.movie && req.query.date && req.query.cinema && req.query.time && req.query.seat) {
    db.confirmTickets(
      req.query.cinema,
      req.query.movie,
      req.query.date,
      req.query.time,
      req.query.seatNo,
      (err, result) => {
        if (err) {
          next();
        } else {
          console.log("hello");
          res.json(result);
        }
      }
    );
  } else if (req.query.movie && req.query.date && req.query.cinema && req.query.time && req.query.seat && req.query.token) {
    jwt.decryption(req.query.token, (err, value) => {
      if (err) {
        console.log(err);
        console.log("surprise3!");
        //next();
      } else {
        loginDb.getUserbyId(value, (err, user) => {
          if (err) {
            console.log(err);
            next();
          } else if (user[0]) {
            db.getEvents((err, result) => {
              if (err) {
                next();
              } else {
                console.log("hello");
                res.json(result);
              }
            });
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
