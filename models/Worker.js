module.exports = function(sequelize, Datatypes) {
  var Worker = sequelize.define("Worker", {
    empId: {
      type: Datatypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    empName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    empSalary: {
      type: Datatypes.BIGINT,
      allowNull: false
    },
    empPosition: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });

  Worker.associate = function(models) {
    Worker.belongsTo(models.Cinema, {
      foreignKey: {
        name: "cinemaId",
        allowNull: false
      },
      as: "cineWorkerId"
    });
    Worker.belongsTo(models.Department, {
      foreignKey: {
        name: "depId",
        allowNull: false
      },
      as: "depWorkerId"
    });
    Worker.hasMany(models.WorkTable, {
      foreignKey: {
        name: "empId",
        allowNull: false
      },
      as: "empWorkTId"
    });
    Worker.hasMany(models.WorkTable, {
      foreignKey: {
        name: "depId",
        allowNull: false
      },
      as: "depIdEmpWorkT"
    });
  };

  return Worker;
};
