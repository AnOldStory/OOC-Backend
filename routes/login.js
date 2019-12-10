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
	try {
		res.send(publicPem);
	} catch(e) {
		console.log(e);
	}
});

router.post("/", (req, res, next) => {
	console.log(req.body);
	const info = JSON.parse(req.body);
	console.log(Object.keys(info));
	console.log(info.member);
	console.log(Object.keys(req.body).length);
	console.log("at login post")
	if (Object.keys(req.body).length === 0) {
		// console.log(req);
		// console.log(req.body);
		console.log(req.body.id);
		console.log(req.body.pwEnc);
		res.send(publicPem);
	} else if (info.member === true) {
		var passwd = "";
		try {
			passwd = rsa.decrypt(info.pwEnc, "utf-8");
		} catch (e) {
			console.log(e);
			next();
		}
		db.getUserbyIdPW(info.id, passwd, (err, result) => {
			//console.log(result);
			//console.log(result[0]);
			//console.log(Object.keys(result));
			//console.log(Object.keys(result[0]));
			console.log("getuserbyid");
			if (err) {
				console.log(err);
				console.log("can2");
				next();
			} else if(result) {
				console.log(Object.keys(result));
				console.log(result[0]);
				console.log("hello\n===========================");
				jwt.encryption({ user: info.id }, (err, token) => {
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
	} else if (info.member === false) {
		var serial = "";
		try {
			serial = rsa.decrypt(info.serialEnc, "utf-8");
		} catch (e) {
			console.log(e);
			next();
		}
		db.getUserbyId(serial, (err, result) => {
			console.log(result);
			console.log(result[0]);
			console.log("getuserbyid");
			if (err) {
				console.log(err);
				console.log("can2");
				next();
			} else if (result[0]) {
				console.log("hello\n===========================");
				jwt.encryption({ user: serial }, (err, token) => {
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
		console.log("vast emptiness2");
	} else {
		console.log("Elsa");
		next();
	}
});

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
