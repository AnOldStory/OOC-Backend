module.exports = function(sequelize, Datatypes) {
  var Movie = sequelize.define("Movie", {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    min_age: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false
    },
    year: {
      type: Datatypes.STRING,
      allowNull: false
    },
    time: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });
  return Movie;
};
