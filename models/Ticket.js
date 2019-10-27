module.exports = function(sequelize, Datatypes) {
  var Ticket = sequelize.define("Ticket", {
    price: {
      type: Datatypes.STRING,
      allowNull: false
    },
    time: {
      type: Datatypes.STRING,
      allowNull: false
    },
    pay: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });
  return Ticket;
};
