module.exports = function(sequelize, Datatypes) {
  var Department = sequelize.define("Department", {
    depId: {
      type: Datatypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    depName: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: false
    },
    depRank: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: false
    }
  });

  Department.associate = function (models){
    Department.hasMany(models.Worker, {
      foreignKey: {
        name: 'depId',
        allowNull: false
      },
      as: 'depWorkerId'
    })
  };

  return Department;
};
