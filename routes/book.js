var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
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

router.get("/tickets", (req, res, next) => {
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

router.get("/tickets", (req, res, next) => {
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

module.exports = router;
