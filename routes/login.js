const express = require("express");
const router = express.Router();
const RSA = require('node-rsa');
const fs = require('fs');
const db = require("./database");
const rsa = new RSA();
var rsaPublic = fs.readFileSync(__dirname + "/../public/rsa/public.pem");
var rsaPrivate = fs.readFileSync(__dirname + "/../public/rsa/private.pem");
rsa.importKey(rsaPrivate, 'private');
const privatePem = rsa.exportKey('private');
rsa.importKey(rsaPublic, 'public');
const publicPem = rsa.exportKey('public');

router.get("/", (req, res, next) => {
    if(!req.query.idEnc || !req.query.pwEnc) {
        res.send(publicPem);
        return;
    } else if (req.query.idEnc && req.query.passEnc) {
        var givenId = rsa.decrypt(req.query.idEnc, 'utf-8');
        var givenPW = rsa.decrypt(req.query.passEnc, 'utf-8');
        // bcrypt 추가되면 전달하는 키워드가 바뀔예정
        db.getUserbyId(givenId, givenPW, (err, result) => {
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
        res.json(err);
        return;
    }
});

module.exports = router;