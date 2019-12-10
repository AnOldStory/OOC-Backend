const express = require("express");
var router = express.Router();
// const personelDb = require("./database");
const RSA = require("node-rsa");
const fs = require("fs");
const rsa = new RSA();
var rsaPublic = fs.readFileSync(__dirname + "/../public/rsa/public.pem");
var rsaPrivate = fs.readFileSync(__dirname + "/../public/rsa/private.pem");
rsa.importKey(rsaPrivate, "private");
const privatePem = rsa.exportKey("private");
rsa.importKey(rsaPublic, "public");
const publicPem = rsa.exportKey("public");
const personelDb = require("./database/personelDb");
const signinDb = require("./database/signInDb");
const stockDb = require("./database/stockDb")
const ticketDb = require("./database/ticketDb")
const jwt = require("../utils/jwt");

router.get("/login", (req, res, next) => {
	try {
		res.send(publicPem);
	} catch(e) {
		console.log(e);
	}
});

router.post("/login", (req, res, next) => {
	const info = JSON.parse(req.body);
  	// if (err) {
  	//     console.log(err);
  	//     // req = JSON.parse(req.req);
  	//     console.log("at signin 21");
  	//     console.log(info);
  	// } else 
	console.log(info)
  	if (Object.keys(info).length === 0) {
  		// } else if (!req.body) {
      		console.log("at signin 26");
      		console.log(info);
      		console.log(Object.keys(info).length);
  		res.send(publicPem);
	} else if (info.name && info.pwEnc && info.pos) {
		console.log("something came");
		var passwd = "";
		try {
			passwd = rsa.decrypt(info.pwEnc, "utf-8");
		} catch (e) {
			console.log(e);
			next();
		}
		personelDb.checkWorkerPosition(info.name, passwd, info.pos, (err, result) => {
			console.log("getuserbyid");
			console.log(Object.keys(result));
			console.log(result.dataValues);
			if (err) {
				console.log(err);
				console.log("can2");
				next();
			} else if(result) {
				console.log("hello\n===========================");
				console.log(result);
				jwt.encryption({ user: result.dataValues.empId }, (err, token) => {
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
  console.log(req.query.token)
  if (req.query.token) {
    jwt.decryption(req.query.token, (err, value) => {
      if (err) {
        console.log(err);
        console.log("surprise3!");
        next();
      } else {
        console.log(value)
        console.log(Object.keys(value))
        console.log(value.user)
        personelDb.getWorkersbyId(value.user, (err, result) => {
          if (err) {
            console.log(err);
            console.log("at /ticket getuserbyid");
            next();
          } else if (result[0]) {
              personelDb.getWorkers((err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              })
          } else {
            console.log(err);
            next();
          }
        });
      }
    });
  } else {
    console.log(err);
    next();
  }
});

router.get("/ticket", (req, res, next) => {
  console.log(req.query.token)
  if (req.query.token) {
    jwt.decryption(req.query.token, (err, value) => {
      if (err) {
        console.log(err);
        console.log("surprise3!");
        next();
      } else {
        console.log(value)
        console.log(Object.keys(value))
        console.log(value.user)
        personelDb.getWorkersbyId(value.user, (err, result) => {
          if (err) {
            console.log(err);
            console.log("at /ticket getuserbyid");
            next();
          } else if (result[0]) {
              ticketDb.getTickets((err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              })
          } else {
            console.log(err);
            next();
          }
        });
      }
    });
  } else {
    console.log(err);
    next();
  }
});

router.get("/stock", (req, res, next) => {
  console.log(req.query.token)
  if (Object.keys(req.query).length === 1) {
    if (req.query.token) {
      jwt.decryption(req.query.token, (err, value) => {
        if (err) {
          console.log(err);
          console.log("surprise3!");
          next();
        } else {
          console.log(value.user)
          personelDb.getWorkersbyId(value.user, (err, result) => {
            console.log(Object.keys(result).length !== 0)
            if (err) {
              console.log(err);
              console.log("at /ticket getuserbyid");
              next();
            } else if (Object.keys(result).length !== 0) {
                stockDb.getGoods((err, result) => {
                  if (err) {
                    next();
                  } else {
                    console.log("hello\n======================================");
                    res.json(result);
                  }
                })
            } else {
              console.log(err);
              next();
            }
          });
        }
      });
    } else {
      console.log(err);
      next();
    }
  } else if (Object.keys(req.query).length === 2) {
    if (req.query.token && req.query.goods) {
      jwt.decryption(req.query.token, (err, value) => {
        if (err) {
          console.log(err);
          console.log("surprise3!");
          next();
        } else {
          console.log(value.user)
          personelDb.getWorkersbyId(value.user, (err, result) => {
            if (err) {
              console.log(err);
              console.log("at /ticket getuserbyid");
              next();
            } else if (result[0]) {
              const givenGoods = req.query.goods.split(",");
              stockDb.deleteGoods(givenGoods, (err, result) => {
                if (err) {
                  next();
                } else {
                  console.log("hello\n======================================");
                  res.json(result);
                }
              });
            } else {
              console.log(err);
              next();
            }
          });
        }
      });
    }
  } else if (Object.keys(req.query).length === 4) {
    console.log(req.query.count);
    if (req.query.token && req.query.name && req.query.count && req.query.cinema) {
      jwt.decryption(req.query.token, (err, value) => {
        if (err) {
          console.log(err);
          console.log("surprise3!");
          next();
        } else {
          console.log(value.user)
          personelDb.getWorkersbyId(value.user, (err, result) => {
            if (err) {
              console.log(err);
              console.log("at /ticket getuserbyid");
              next();
            } else if (result[0]) {
                stockDb.addGoodCounts(req.query.name, req.query.count, req.query.cinema, (err, result) => {
                  if (err) {
                    next();
                  } else {
                    console.log("hello\n======================================");
                    res.json(result);
                  }
                })
            } else {
              console.log(err);
              next();
            }
          });
        }
      });
    }
  } else if (Object.keys(req.query).length === 5) {
    console.log("were in")
    if (req.query.token && req.query.name && req.query.count && req.query.price && req.query.cinema) {
      jwt.decryption(req.query.token, (err, value) => {
        if (err) {
          console.log(err);
          console.log("surprise3!");
          next();
        } else {
          console.log(value.user)
          personelDb.getWorkersbyId(value.user, (err, result) => {
            if (err) {
              console.log(err);
              console.log("at /ticket getuserbyid");
              next();
            } else if (result[0]) {
              console.log(req.query.name)
              console.log(req.query.count)
              console.log(req.query.price)
              console.log(req.query.cinema)
                stockDb.addGoods(req.query.name, req.query.count, req.query.price, req.query.cinema, (err, result) => {
                  if (err) {
                    next();
                  } else {
                    console.log("hello\n======================================");
                    res.json(result);
                  }
                })
            } else {
              console.log(err);
              next();
            }
          });
        }
      });
    }
  } else {

  }
  
});

// router.get("/personel", (req, res, next) => {
  
//   if (Object.keys(req.query).length === 0) {
//     personelDb.getWorkers((err, result) => {
//       if (err) {
//         next();
//       } else {
//         console.log("hello\n======================================");
//         res.json(result);
//       }
//     });
//   } else if (Object.keys(req.query).length === 1) {
//     if (req.query.id) {
//       personelDb.getWorkersbyId(req.query.id, (err, result) => {
//         if (err) {
//           next();
//         } else {
//           console.log("hello\n======================================");
//           res.json(result);
//         }
//       });
//     } else if (req.query.dep) {
//       personelDb.getWorkersbyDep(req.query.dep, (err, result) => {
//         if (err) {
//           next();
//         } else {
//           console.log("hello\n======================================");
//           res.json(result);
//         }
//       });
//     } else if (req.query.cinema) {
//       personelDb.getWorkersbyCin(req.query.cinema, (err, result) => {
//         if (err) {
//           next();
//         } else {
//           console.log("hello\n======================================");
//           res.json(result);
//         }
//       });
//     } else if (req.query.pos) {
//       personelDb.getWorkersbyPos(req.query.pos, (err, result) => {
//         if (err) {
//           next();
//         } else {
//           console.log("hello\n======================================");
//           res.json(result);
//         }
//       });
//     } else if (req.query.name) {
//       personelDb.getWorkersbyName(req.query.name, (err, result) => {
//         if (err) {
//           next();
//         } else {
//           console.log("hello\n======================================");
//           res.json(result);
//         }
//       });
//     }
//   } else if (Object.keys(req.query).length === 2) {
//     if (req.query.pos && req.query.dep) {
//       personelDb.getWorkersbyDepPos(
//         req.query.dep,
//         req.query.pos,
//         (err, result) => {
//           if (err) {
//             next();
//           } else {
//             console.log("hello\n======================================");
//             res.json(result);
//           }
//         }
//       );
//     } else if (req.query.dep && req.query.cinema) {
//       personelDb.getWorkersbyDepCin(
//         req.query.dep,
//         req.query.cinema,
//         (err, result) => {
//           if (err) {
//             next();
//           } else {
//             console.log("hello\n======================================");
//             res.json(result);
//           }
//         }
//       );
//     } else {
//       personelDb.getWorkersbyPosCin(
//         req.query.pos,
//         req.query.cinema,
//         (err, result) => {
//           if (err) {
//             next();
//           } else {
//             console.log("hello\n======================================");
//             res.json(result);
//           }
//         }
//       );
//     }
//   } else if (Object.keys(req.query).length === 3) {
//     personelDb.getWorkersbyDepPosCin(
//       req.query.dep,
//       req.query.pos,
//       req.query.cinema,
//       (err, result) => {
//         if (err) {
//           next();
//         } else {
//           console.log("hello\n======================================");
//           res.json(result);
//         }
//       }
//     );
//   } else {
//     next();
//   }
// });

router.post("/personel/signin", (res, req, err) => {
  const info = JSON.parse(req.req.body);
  // if (err) {
  //     console.log(err);
  //     // req = JSON.parse(req.req);
  //     console.log("at signin 21");
  //     console.log(info);
  // } else 
  if (Object.keys(info).length === 0) {
  // } else if (!req.body) {
      console.log("at signin 26");
      console.log(info);
      console.log(Object.keys(info).length);
  res.send(publicPem);
} else {
      console.log("at signin");
      console.log(info)
      var passwd = "";
  try {
    passwd = rsa.decrypt(info.passEnc, "utf-8");
  } catch (e) {
    console.log(e);
    next();
  }
      signinDb.addWorker(passwd, info.name, info.sal, info.pos, (err, result) => {
          if (err) {
              console("err");
              console.log(err);
              next();
          } else {
              console.log("aloha\n================================");
              res.json(result);
          }
      });
  }
});

router.get("/personel/signin", (req, res, next) => {
console.log(req.query);
  if (Object.keys(req.query).length === 0) {
      try {
          res.send(publicPem);
      } catch(e) {
          console.log(e);
      }
  }
});

module.exports = router;
