module.exports = function(sequelize, Datatypes) {
  var Cinema = sequelize.define("Cinema", {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });
  return Cinema;
};
