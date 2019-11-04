module.exports = function(sequelize, Datatypes) {
  var WorkTable = sequelize.define("WorkTable", {
    workTableDate: {
      type: Datatypes.STRING,
      allowNull: false
    },
    workTableKind: {
      type: Datatypes.STRING,
      allowNull: false
    },
    workTableFinished: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });

  WorkTable.associate = function (models){
    WorkTable.belongsTo(models.Facility, {
      foreignKey: {
        name: 'cinemaId',
        allowNull: false
      },
      as: 'cinemaIdFacWorkT'
    });
    WorkTable.belongsTo(models.Facility, {
      foreignKey: {
        name: 'facilityId',
        allowNull: false
      },
      as: 'facIdWorkT'
    });
    WorkTable.belongsTo(models.Worker, {
      foreignKey: {
        name: 'empId',
        allowNull: false
      },
      as: 'empWorkTId'
    });
    WorkTable.belongsTo(models.Worker, {
      foreignKey: {
        name: 'depId',
        allowNull: false
      },
      as: 'depIdEmpWorkT'
    });
  };

  return WorkTable;
};
