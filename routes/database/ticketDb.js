var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.getTickets = (callback) => {
    Models.Ticket.findAll()
        .then(result => {
          console.log("getting all tickets...");
          return callback(null, result);
        })
        .catch(err => {
          console.log("error");
          console.log(err);
          return callback(err, false);
        });
}

exports.getTicketById = (id, callback) => {
    Models.Ticket.findAll({
        subQuery: false,
        where: {
          [Op.and]: [{ customerId: id }]
        }
    })
        .then(result => {
          console.log("getting all tickets...");
          return callback(null, result);
        })
        .catch(err => {
          console.log("error");
          console.log(err);
          return callback(err, false);
        });
}