module.exports = function(sequelize, Datatypes) {
  var Cinema = sequelize.define("Cinema", {
    cinemaId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    cinemaName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    cinemaAddress: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });

  Cinema.associate = function(models) {
    Cinema.hasMany(models.ShowRoom, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineRoomId"
    });
    Cinema.hasMany(models.Facility, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineFacId"
    });
    Cinema.hasMany(models.Goods, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineGoodsId"
    });
    Cinema.hasMany(models.Worker, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineWorkerId"
    });
  };

  return Cinema;
};
