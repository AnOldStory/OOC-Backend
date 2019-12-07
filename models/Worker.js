const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, Datatypes) {
  var Worker = sequelize.define("Worker", {
    empId: {
      type: Datatypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    empPW: {
      type: Datatypes.STRING,
      allowNull: false
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
  },
  {
    hooks : {
        beforeCreate : (Worker , options) => {
            {   
                const salt = bcrypt.genSaltSync(10);
                Worker.empPW = bcrypt.hashSync(Worker.empPW, salt);
            }
        }
    },
    instanceMethods: {
        validPassword: (plain, hash) => {
          return bcrypt.compareSync(plain, hash);
        }
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
