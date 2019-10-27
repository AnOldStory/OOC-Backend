module.exports = function(sequelize, Datatypes) {
  var Schedule = sequelize.define("Schedule", {
    count: {
      type: Datatypes.STRING,
      allowNull: false
    },
    time: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });
  return Schedule;
};
