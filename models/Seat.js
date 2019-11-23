module.exports = function(sequelize, Datatypes) {
  var Seat = sequelize.define("Seat", {
    seatNumber: {
      type: Datatypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });

  Seat.associate = function(models) {
    Seat.belongsTo(models.ShowRoom, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdRoomSeat",
      allowNull: false
    });
    Seat.belongsTo(models.ShowRoom, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdSeat",

      allowNull: false
    });
    Seat.hasMany(models.Ticket, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdSeatTicket",

      allowNull: false
    });
    Seat.hasMany(models.Ticket, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdSeatTicket",
      allowNull: false
    });
    Seat.hasMany(models.Ticket, {
      foreignKey: {
        name: "seatNumber",
        allowNull: false
      },
      as: "seatNoTicket",
      allowNull: false
    });
  };

  return Seat;
};
