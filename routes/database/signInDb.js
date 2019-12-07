var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.addCustomer = (id, pw, name, rank, birth, phone, email, callback) => {
    Models.Customer.create({
        customerId: id,
        customerPW: pw,
        customerName: name,
        customerBirth: birth,
        customerRank: rank,
        customerPhone: phone,
        customerEmail: email
    })
    .then(result => {
        result = {"result" : "ok"};
        return callback(null, result);
    })
    .catch(err => {
        console.log("error");
        console.log(err);
        return callback(err, false);
    });
};

exports.addWorker = (pw, name, sal, pos, callback) => {
    Models.Worker.create({
        empPW: pw,
        empName: name,
        empSalary: sal,
        empPosition: pos,
	cinemaId: 1,
	depId: 1
    })
    .then(result => { 
        result = {"result" : "ok"};
        return callback(null, result);
    })
    .catch(err => {
        console.log("error");
        console.log(err);
	return callback(err, false);
    });
};
