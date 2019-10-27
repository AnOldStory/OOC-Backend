module.exports = function(sequelize, Datatypes) {
  var Facility = sequelize.define("Facility", {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return Facility;
};
