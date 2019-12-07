var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.addCustomer = (id, pw, name, rank, birth, phone, email) => {
    Models.Customer.create({
        customerId: id,
        customerPW: pw,
        customerName: name,
        customerBirth: birth,
        customerRank: rank,
        customerPhone: phone,
        customerEmail: email
    })
    .catch(err => {
        console.log("error");
        console.log(err);
    });
};

exports.addWorker = (pw, name, sal, pos) => {
    Models.Worker.create({
        empPW: pw,
        empName: name,
        empSalary: sal,
        empPosition: pos,
	cinemaId: 1,
	depId: 1
    })
    .catch(err => {
        console.log("error");
        console.log(err);
    });
};
