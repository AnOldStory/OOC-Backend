const express = require("express");
const router = express.Router();
const RSA = require("node-rsa");
const fs = require("fs");
// const db = require("./database");
const db = require("./database/signInDb");
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
    if (Object.keys(req.query).length === 0) {
        try {
            res.send(publicPem);
        } catch(e) {
            console.log(e);
        }
    } else {
        const passwd = "";
		try {
			passwd = rsa.decrypt(req.body.passEnc, "utf-8");
		} catch (e) {
			console.log(e);
			next();
		}
        db.addWorker(req.query.id, passwd, req.query.name, req.query.rank, req.query.birth, req.query.email, (err) => {
            if (err) {
                console("err");
                console.log(err);
                next();
            }
        });
    }
});

// router.post("/", (req, res, next) => {
// 	if (!req.body.id || !req.body.pwEnc) {
// 		console.log(req);
// 		console.log(req.body);
// 		console.log(req.body.id);
// 		console.log(req.body.pwEnc);
// 		res.send(publicPem);
// 	} else if (req.body.member) {
// 		const passwd = "";
// 		try {
// 			passwd = rsa.decrypt(req.body.passEnc, "utf-8");
// 		} catch (e) {
// 			console.log(e);
// 			next();
// 		}
// 		db.getUserbyIdPW(req.body.id, passwd, (err, result) => {
// 			console.log("getuserbyid");
// 			if (err) {
// 				console.log(err);
// 				console.log("can2");
// 				next();
// 			} else if(result[0]) {
// 				console.log("hello\n===========================");
// 				console.log(result);
// 				jwt.encryption({ user: req.body.id }, (err, token) => {
// 					console.log(token);
// 					if (err) {
// 						console.log(err);
// 						console.log("can1");
// 						next();
// 					} else {
// 						console.log("cant");
// 						res.send(token);
// 					}
// 				});
// 			} else {
// 				console.log("search failed in login.js");
// 				next();
// 			}
// 		});
// 		console.log("vast emptiness");
// 		// bcrypt 추가되면 전달하는 키워드가 바뀔예정
// 	} else if (!req.body.member) {
		
// 	} else {
// 		console.log("Elsa");
// 		next();
// 	}
// });

// router.post("/", (req, res, next) => {
// 	if (!req.body.id || !req.body.pwEnc) {
// 		console.log(req);
// 		console.log(req.body);
// 		console.log(req.body.id);
// 		console.log(req.body.pwEnc);
// 		res.send(publicPem);
// 	} else if (req.body.id && req.body.pwEnc) {
// 		try {
// 			const enc = rsa.decrypt(req.body.passEnc, "utf-8");
// 		} catch (e) {
// 			console.log(e);
// 			next();
// 		}
// 		db.getUserbyIdPW(req.body.id, req.body.pwEnc, (err, result) => {
// 			console.log("getuserbyid");
// 			if (err) {
// 				console.log(err);
// 				console.log("can2");
// 				next();
// 			} else if(result[0]) {
// 				console.log("hello\n===========================");
// 				console.log(result);
// 				jwt.encryption({ user: req.body.id }, (err, token) => {
// 					console.log(token);
// 					if (err) {
// 						console.log(err);
// 						console.log("can1");
// 						next();
// 					} else {
// 						console.log("cant");
// 						res.send(token);
// 					}
// 				});
// 			} else {
// 				console.log("search failed in login.js");
// 				next();
// 			}
// 		});
// 		console.log("vast emptiness");
// 		// bcrypt 추가되면 전달하는 키워드가 바뀔예정
// 	} else {
// 		console.log("Elsa");
// 		next();
// 	}
// });

module.exports = router;
