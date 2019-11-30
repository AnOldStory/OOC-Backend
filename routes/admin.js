var express = require("express");
var router = express.Router();
// const personelDb = require("./database");
const personelDb = require("./database/personelDb");
const jwt = require("../utils/jwt");

router.get("/login", (req, res, next) => {
	try {
		res.send(publicPem);
	} catch(e) {
		console.log(e);
	}
});

router.post("/login", (req, res, next) => {
	if (!req.body.id || !req.body.pwEnc) {
		console.log(req);
		console.log(req.body);
		console.log(req.body.id);
		console.log(req.body.pwEnc);
		res.send(publicPem);
	} else if (req.body.id && req.body.pwEnc && req.body.pos) {
		const passwd = "";
		try {
			passwd = rsa.decrypt(req.body.passEnc, "utf-8");
		} catch (e) {
			console.log(e);
			next();
		}
		personelDb.checkWorkerPosition(req.body.id, passwd, req.body.pos, (err, result) => {
			console.log("getuserbyid");
			if (err) {
				console.log(err);
				console.log("can2");
				next();
			} else if(result[0]) {
				console.log("hello\n===========================");
				console.log(result[0]);
				jwt.encryption({ user: req.body.id }, (err, token) => {
					console.log(token);
					if (err) {
						console.log(err);
						console.log("can1");
						next();
					} else {
						console.log("cant");
						res.send(token);
					}
				});
			} else {
				console.log("search failed in login.js");
				next();
			}
		});
		console.log("vast emptiness");
		// bcrypt 추가되면 전달하는 키워드가 바뀔예정
	} else {
		console.log("Elsa");
		next();
	}
});

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
      personelDb.getWorkersbyDepPos(
        req.query.dep,
        req.query.pos,
        (err, result) => {
          if (err) {
            next();
          } else {
            console.log("hello\n======================================");
            res.json(result);
          }
        }
      );
    } else if (req.query.dep && req.query.cinema) {
      personelDb.getWorkersbyDepCin(
        req.query.dep,
        req.query.cinema,
        (err, result) => {
          if (err) {
            next();
          } else {
            console.log("hello\n======================================");
            res.json(result);
          }
        }
      );
    } else {
      personelDb.getWorkersbyPosCin(
        req.query.pos,
        req.query.cinema,
        (err, result) => {
          if (err) {
            next();
          } else {
            console.log("hello\n======================================");
            res.json(result);
          }
        }
      );
    }
  } else if (Object.keys(req.query).length === 3) {
    personelDb.getWorkersbyDepPosCin(
      req.query.dep,
      req.query.pos,
      req.query.cinema,
      (err, result) => {
        if (err) {
          next();
        } else {
          console.log("hello\n======================================");
          res.json(result);
        }
      }
    );
  } else {
    next();
  }
});

module.exports = router;
