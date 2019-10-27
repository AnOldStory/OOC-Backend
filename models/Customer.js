module.exports = function(sequelize, Datatypes) {
  var Customer = sequelize.define("Customer", {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    rank: {
      type: Datatypes.STRING,
      allowNull: false
    },
    birth: {
      type: Datatypes.STRING,
      allowNull: false
    },
    phone: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    email: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });
  return Customer;
};
