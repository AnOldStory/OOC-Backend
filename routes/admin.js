var express = require("express");
var router = express.Router();
// const personelDb = require("./database");
const personelDb = require("./database/personelDb");

router.get("/personel", (req, res, next) => {
    if (Object.keys(req.query).length === 0) {
        personelDb.getWorkers((err, result) => {
          if (err) {
            next();
          } else {
            console.log("hello\n======================================");
            res.json(result);
          }
        });
      } else if (Object.keys(req.query).length === 1) {
        if (req.query.id) {
            personelDb.getWorkersbyId(req.query.id, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        } else if (req.query.dep) {
            personelDb.getWorkersbyDep(req.query.dep, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        } else if (req.query.cinema) {
            personelDb.getWorkersbyCin(req.query.cinema, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        } else if (req.query.pos) {
            personelDb.getWorkersbyPos(req.query.pos, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        } else if (req.query.name) {
            personelDb.getWorkersbyName(req.query.name, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        }
      } else if (Object.keys(req.query).length === 2) {
        if (req.query.pos && req.query.dep) {
            personelDb.getWorkersbyDepPos(req.query.dep, req.query.pos, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        } else if (req.query.dep && req.query.cinema) {
            personelDb.getWorkersbyDepCin(req.query.dep, req.query.cinema, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        } else {
            personelDb.getWorkersbyPosCin(req.query.pos, req.query.cinema, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
        }
      } else if (Object.keys(req.query).length === 3) {
        personelDb.getWorkersbyDepPosCin(req.query.dep, req.query.pos, req.query.cinema, (err, result) => {
            if (err) {
              next();
            } else {
              console.log("hello\n======================================");
              res.json(result);
            }
          });
    } else {
        next();
    }
  });

module.exports = router;
