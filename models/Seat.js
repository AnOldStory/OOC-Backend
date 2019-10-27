module.exports = function(sequelize, Datatypes) {
  var Seat = sequelize.define("Seat", {
    number: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });
  return Seat;
};
