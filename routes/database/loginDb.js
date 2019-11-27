var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.getUserbyIdPW = (id, pw, callback) => {
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

// , {customerPW: pw}
