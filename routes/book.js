var express = require("express");
var router = express.Router();
// const db = require("./database");
const db = require("./database/bookDb");
const loginDb = require("./database/loginDb");
const signinDb = require("./database/signInDb");
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
          console.log(result[0] === true);
          console.log(result[0] === false);
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
  } else if (Object.keys(req.query).length === 3) {
    if (req.query.movie && req.query.date && req.query.cinema) {
      console.log(req.query.date)
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
    } else {
      next();
    }
  } else if (Object.keys(req.query).length === 4) {
      if (req.query.movie && req.query.date && req.query.cinema && req.query.time) {
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
    } else {
      next();
    }
  } else if (Object.keys(req.query).length === 5) {
      if (req.query.movie && req.query.date && req.query.cinema && req.query.time && req.query.seat) {
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
    } else {
      next();
    }
  } else if (Object.keys(req.query).length === 6) { 
    if (req.query.movie && req.query.date && req.query.cinema && req.query.time && req.query.seat && req.query.token) {
      if (req.query.token === 0){
        const result = {"result": "OK"}
        console.log("gyello")
        res.send(result);
      } else {
        jwt.decryption(req.query.token, (err, value) => {
          if (err) {
            console.log(err);
            console.log("surprise3!");
            //next();
          } else {
            loginDb.getUserbyId(value.user, (err, user) => {
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
      }
    } else {
      next();
    }
  } else {
    console.log("in else")
    console.log(Object.keys(req.query))
    console.log(Object.keys(req.query).length)
    console.log(Object.keys(req.query.token).length)
    if (req.query.cinema && req.query.showroom && req.query.movie &&
      req.query.screen && req.query.seats && req.query.token &&
      req.query.price && req.query.payment && req.query.event) {
      console.log("checking params")
	console.log(req.query.token)
	console.log(req.query.phone)
	console.log(req.query.email)
	//console.log(req.query.token === '0')
	//console.log(req.query.token === 0 && req.query.phone && req.query.email)
	if (req.query.token === '0' && req.query.phone && req.query.email) {
    console.log("nonmenber")
	  const serial = Math.floor(Math.random() * (1e8 - 1e7)) + 1e7;
    signinDb. addCustomer(serial, "nm", "nm", "nm",
                              "nm", req.query.phone,
                              req.query.email, (err, result) => {
      if (err) {
        console.log(err);
        next();
      } else {
        console.log(result)
	      console.log("added customer")
        const givenSeats = req.query.seats.split(",");
        db.confirmTickets(req.query.cinema, req.query.showroom, req.query.movie,
                              req.query.screen, givenSeats, serial,
                              req.query.price, req.query.payment, req.query.event, (err, result) => {
          if (err) {
            console.log(err);
            next();
          } else {
		        result.serial = serial
            console.log("hello\n=======================");
            res.json(result);
          } 
        });
      }
    })
  } else if (Object.keys(req.query.token).length > 16) {
      console.log("were on")
	    jwt.decryption(req.query.token, (err, value) => {
      if (err) {
            console.log(err);
            console.log("surprise3!");
            //next();
          } else {
	    console.log("were in")
            const givenSeats = req.query.seats.split(",");
            db.confirmTickets(req.query.cinema, req.query.showroom, req.query.movie,
                                  req.query.screen, givenSeats, value.user,
                                  req.query.price, req.query.payment, req.query.event, (err, result) => {
              if (err) {
                console.log(err);
                next();
              } else {
                console.log("hello\n=======================");
                res.json(result);
              } 
            });
          }
        });  
      } else {
        next();
      }
    }
  }
});


module.exports = router;
