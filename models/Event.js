module.exports = function(sequelize, Datatypes) {
  var Event = sequelize.define("Event", {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    discount_percent: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    discount_const: {
      type: Datatypes.STRING,
      allowNull: false
    },
    discount_maximum: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    can_together: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });
  return Event;
};
