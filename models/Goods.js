module.exports = function(sequelize, Datatypes) {
  var Goods = sequelize.define("Goods", {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    count: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    price: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  });
  return Goods;
};
