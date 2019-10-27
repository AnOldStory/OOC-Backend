module.exports = function(sequelize, Datatypes) {
  var Sell = sequelize.define("Sell", {
    id: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    count: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    price: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    pay: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });
  return Sell;
};
