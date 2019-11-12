var Models = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

/* Get One Object from Cinema Model that have column 'CinemaId'*/
exports.getCinemaById = (id, callback) => {
  Models.Cinema.findOne({
    where: {
      [Op.and]: [{ cinemaId: id }]
    },
    limit: 10
  })
    .then(result => {
      //Queru Success
      return callback(null, result);
    })
    .catch(err => {
      //Exception
      return callback(err, false);
    });
};
