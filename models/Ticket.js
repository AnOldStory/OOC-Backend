module.exports = function(sequelize, Datatypes) {
  var Ticket = sequelize.define("Ticket", {
    ticketPrice: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    ticketTime: {
      type: Datatypes.STRING,
      allowNull: false
    },
    ticketPaymentType: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });

  Ticket.associate = function(models) {
    Ticket.belongsTo(models.Schedule, {
      foreignKey: {
        name: "screeningId",
        allowNull: false
      },
      as: "screeningIdTicket"
    });
    Ticket.belongsTo(models.Schedule, {
      foreignKey: {
        name: "screeningTime",
        allowNull: false
      },
      as: "screeningTimeTicket"
    });
    Ticket.belongsTo(models.Schedule, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdScheTicket"
    });
    Ticket.belongsTo(models.Schedule, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdScheTicket"
    });
    Ticket.belongsTo(models.Schedule, {
      foreignKey: {
        name: "movieId",
        allowNull: false
      },
      as: "movieIdScheTicket"
    });
    Ticket.belongsTo(models.Seat, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdSeatTicket"
    });
    Ticket.belongsTo(models.Seat, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdSeatTicket"
    });
    Ticket.belongsTo(models.Event, {
      foreignKey: {
        name: "eventId",
        allowNull: false
      },
      as: "eventIdTicket"
    });
    Ticket.belongsTo(models.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false
      },
      as: "customerIdTicket"
    });
  };

  return Ticket;
};
