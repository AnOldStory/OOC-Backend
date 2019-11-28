const express = require("express");
const router = express.Router();
const RSA = require("node-rsa");
const fs = require("fs");
// const db = require("./database");
const db = require("./database/loginDb");
const rsa = new RSA();
var rsaPublic = fs.readFileSync(__dirname + "/../public/rsa/public.pem");
var rsaPrivate = fs.readFileSync(__dirname + "/../public/rsa/private.pem");
rsa.importKey(rsaPrivate, "private");
const privatePem = rsa.exportKey("private");
rsa.importKey(rsaPublic, "public");
const publicPem = rsa.exportKey("public");
const jwt = require("../utils/jwt");
// var jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  if (!req.query.id || !req.query.pwEnc) {
    res.send(publicPem);
  } else if (req.query.id && req.query.pwEnc) {
    // var givenId = rsa.decrypt(req.body.idEnc, 'utf-8');
    console.log(req.query.id);
    console.log(req.query.pwEnc);
    try {
      rsa.decrypt(req.query.passEnc, "utf-8");
    } catch (e) {
      console.log(e);
      next();
    }
    jwt.encryption({ user: req.query.id }, (err, token) => {
      console.log(token);
      console.log("encryption");
      if (err) {
        console.log(err);
        console.log("can1");
        next();
      } else {
        db.getUserbyIdPW(req.query.id, req.query.pwEnc, (err, result) => {
          console.log("getuserbyid");
          if (err) {
            console.log(err);
            console.log("can2");
            next();
          } else {
            console.log("hello\n===========================");
            console.log(result);
            if (!result.length) {
              console.log("length not defined");
              res.send(token);
            }
          }
        });
      }
      console.log(token);
    });
    console.log("vast emptiness");
    // bcrypt 추가되면 전달하는 키워드가 바뀔예정
  } else {
    console.log("Elsa");
    // res.json(err);
    // return;
  }
});

router.post("/", (req, res, next) => {
  if (!req.body.id || !req.body.pwEnc) {
    console.log(req);
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.pwEnc);
    res.send(publicPem);
  } else if (req.body.id && req.body.pwEnc) {
    try {
      rsa.decrypt(req.body.passEnc, "utf-8");
    } catch (e) {
      console.log(e);
      next();
    }
    db.getUserbyIdPW(req.body.id, req.body.pwEnc, (err, result) => {
      console.log("getuserbyid");
      if (err) {
        console.log(err);
        console.log("can2");
        next();
      } else {
        console.log("hello\n===========================");
        console.log(result);
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
      }
    });
    console.log("vast emptiness");
    // bcrypt 추가되면 전달하는 키워드가 바뀔예정
  } else {
    console.log("Elsa");
    next();
  }
});

module.exports = router;
