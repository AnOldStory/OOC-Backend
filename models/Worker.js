module.exports = function(sequelize, Datatypes) {
  var Worker = sequelize.define("Worker", {
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
    salary: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    position: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return Worker;
};
