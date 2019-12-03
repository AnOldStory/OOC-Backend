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
                return new Promise ((resolve, reject) => {
                  bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                      console.log("at worker gensalt");
                      console.log(err);
                      return reject(err);
                    } else {
                      bcrypt.hash(Worker.empPW, salt, (err, hash) => {
                        if (err) {
                          console.log("error at worker hash");
                          console.log(err);
                        }
                        Worker.setDataValue('empPW', hash);
                        return resolve(Worker, options);
                      });
                    }
                  });
                })
            }
        }
    },
    instanceMethods: {
      validPassword: (password, hash) => {
        return bcrypt.compareSync(password, hash);
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
