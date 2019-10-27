module.exports = function(sequelize, Datatypes) {
  var WorkTable = sequelize.define("WorkTable", {
    date: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    kind: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    isEnd: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return WorkTable;
};
