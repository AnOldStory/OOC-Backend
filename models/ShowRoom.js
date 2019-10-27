module.exports = function(sequelize, Datatypes) {
  var Showroom = sequelize.define("Showroom", {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return Showroom;
};
