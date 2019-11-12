module.exports = function(sequelize, Datatypes) {
  var Schedule = sequelize.define("Schedule", {
    screeningId: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    screeningTime: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true
    },
    screeningDate: {
      type: Datatypes.STRING,
      allowNull: false
    },
    screeningLeftSeats: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });

  Schedule.associate = function(models) {
    Schedule.belongsTo(models.ShowRoom, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdRoomSche",
      allowNull: false
    });
    Schedule.belongsTo(models.ShowRoom, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdSche",
      allowNull: false
    });
    Schedule.belongsTo(models.Schedule, {
      foreignKey: {
        name: "movieId",
        allowNull: false
      },
      as: "movieIdSchedule",
      allowNull: false
    });
    Schedule.hasMany(models.Ticket, {
      foreignKey: {
        name: "screeningId",
        allowNull: false
      },
      as: "screeningIdTicket",
      allowNull: false
    });
    Schedule.hasMany(models.Ticket, {
      foreignKey: {
        name: "screeningTime",
        allowNull: false
      },
      as: "screeningTimeTicket",
      allowNull: false
    });
    Schedule.hasMany(models.Ticket, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdScheTicket",
      allowNull: false
    });
    Schedule.hasMany(models.Ticket, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdScheTicket",
      allowNull: false
    });
    Schedule.hasMany(models.Ticket, {
      foreignKey: {
        name: "movieId",
        allowNull: false
      },
      as: "movieIdScheTicket",
      allowNull: false
    });
  };

  return Schedule;
};
