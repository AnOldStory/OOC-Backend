module.exports = function(sequelize, Datatypes) {
  var Facility = sequelize.define("Facility", {
    facilityId: {
      type: Datatypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    facilityName: {
      type: Datatypes.STRING,
      allownull: false,
      autoIncrement: false,
      primaryKey: false
    }
  });

  Facility.associate = function(models) {
    Facility.belongsTo(models.Cinema, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineFacId"
    });
    Facility.hasMany(models.WorkTable, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cinemaIdFacWorkT"
    });
    Facility.hasMany(models.WorkTable, {
      foreignKey: {
        name: "facilityId",
        allowNull: false
      },
      as: "facIdWorkT"
    });
  };

  return Facility;
};
