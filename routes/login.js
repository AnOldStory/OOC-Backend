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

router.post("/", (req, res, next) => {
  if (!req.params.id || !req.params.pwEnc) {
    res.send(publicPem);
    // var givenId = rsa.decrypt(req.params.idEnc, 'utf-8');
    console.log(req.params.id);
    console.log(req.params.pwEnc);
    try {
      rsa.decrypt(req.params.passEnc, "utf-8");
    } catch (e) {
      console.log(e);
      next();
    }
    jwt.encryption({ user: req.params.id }, (err, token) => {
      console.log(token);
      console.log("encryption");
      if (err) {
        console.log(err);
        console.log("can1");
        next();
      } else {
        db.getUserbyIdPW(req.params.id, req.params.pwEnc, (err, result) => {
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

function rsaDecrypt(string) {
  return new Promise();
}

module.exports = router;
