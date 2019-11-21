module.exports = function(sequelize, Datatypes) {
  var Customer = sequelize.define("Customer", {
    customerId: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    customerPW:{
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    customerName: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: false
    },
    customerRank: {
      type: Datatypes.STRING,
      allowNull: false
    },
    customerBirth: {
      type: Datatypes.STRING,
      allowNull: false
    },
    customerPhone: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    customerEmail: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Ticket, {
      foreignKey: {
        name: "customerId",
        allowNull: false
      },
      as: "customerIdTicket"
    });
  };

  return Customer;
};
