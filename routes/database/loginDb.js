var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.getUserbyId = (id, callback) => {
  Models.Customer.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ customerId: id }]
    }
  })
    .then(result => {
      console.log("getting customers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getUserbyIdPW = (id, pw, callback) => {
  Models.Customer.findOne({
    subQuery: false,
    where: {
      [Op.and]: [{ customerId: id }]
    }
  })
  .then((result) => {
    if (result.validPassword(pw)) {
      console.log("getting customers...");
      return callback(null, result)
    } else {
    console.log("search failed");
    console.log(err)
    return callback(err, false);
    }
  }).catch(err => {
    console.log("error");
    console.log(err)
    return callback(err, false);
  });
};

// , 
