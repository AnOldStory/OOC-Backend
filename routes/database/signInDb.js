var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.deleteCustomer = (id, callback) => {
    Models.Customer.destroy({
        where: {
            [Op.and]: [{customerId: id}]
          }
    })
    .then(result => {
        console.log("deleting customers...");
        return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

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
    .then(() => {
	console.log("at addCustomer");
	//console.log(result)
        const result = {"result" : "ok"};
	console.log(result);
        //resulto = "OKBODY"
	return callback(null, result);
    })
    .catch(err => {
        console.log("error");
        console.log(Object.keys(err));
        console.log(err.name);
        console.log(err.errors);
        // console.log(err);
        return callback(err, false);
    });
};

exports.addWorker = (pw, name, sal, pos, cinema, callback) => {
    Models.Worker.create({
        empPW: pw,
        empName: name,
        empSalary: sal,
        empPosition: pos,
	cinemaId: cinema,
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
