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

router.get("/book", (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    db.getSchedules((err, result) => {
      if (err) {
        next();
      } else {
        console.log("hello\n======================================");
        res.json(result);
        return;
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
          return;
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
          return;
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
          return;
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
            return;
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
            return;
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
            return;
          }
        }
      );
    }
  } else {
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
          return;
        }
      }
    );
  }
});

router.get("/book/tickets", (req, res, next) => {
  if (req.query.cinema && req.query.movie && req.query.date && req.query.time) {
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
});

router.get("/book/tickets", (req, res, next) => {
  if (
    req.query.cinema &&
    req.query.movie &&
    req.query.date &&
    req.query.time &&
    req.query.seatNo
  ) {
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
