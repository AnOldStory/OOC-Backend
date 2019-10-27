module.exports = function(sequelize, Datatypes) {
  var ShowRoom = sequelize.define("ShowRoom", {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return ShowRoom;
};
