module.exports = function(sequelize, Datatypes) {
  var ShowRoom = sequelize.define("ShowRoom", {
    showRoomId: {
      type: Datatypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });

  ShowRoom.associate = function(models) {
    ShowRoom.belongsTo(models.Cinema, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineRoomId"
    });
    ShowRoom.hasMany(models.Schedule, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdRoomSche"
    });
    ShowRoom.hasMany(models.Seat, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineIdRoomSeat"
    });
    ShowRoom.hasMany(models.Schedule, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdSche"
    });
    ShowRoom.hasMany(models.Seat, {
      foreignKey: {
        name: "showRoomId",
        allowNull: false
      },
      as: "roomIdSeat"
    });
  };

  return ShowRoom;
};
