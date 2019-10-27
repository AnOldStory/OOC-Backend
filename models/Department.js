module.exports = function(sequelize, Datatypes) {
  var Department = sequelize.define("Department", {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    rank: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return Department;
};
