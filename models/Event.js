module.exports = function(sequelize, Datatypes) {
  var Event = sequelize.define("Event", {
    eventId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    eventName: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    eventDCByPercent: {
      type: Datatypes.STRING,
      allowNull: false
    },
    eventDCByCost: {
      type: Datatypes.STRING,
      allowNull: false
    },
    eventMaxDC: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    can_together: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });

  Event.associate = function (models){
    Event.hasMany(models.Ticket, {
      foreignKey: {
        name: 'eventId',
        allowNull: false
      },
      as: 'eventIdTicket'
    });
    Event.hasMany(models.Sell, {
      foreignKey: {
        name: 'eventId',
        allowNull: false
      },as: 'eventIdSell'

    });
  };
  
  return Event;
};
