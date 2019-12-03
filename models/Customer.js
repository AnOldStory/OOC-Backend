const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, Datatypes) {
  var Customer = sequelize.define("Customer", {
    customerId: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    customerPW: {
      type: Datatypes.STRING,
      allowNull: false,
      // primaryKey: true
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
    },
  },
  {
    hooks : {
        beforeCreate : (Customer , options) => {
            {   
              const salt = bcrypt.genSaltSync(10);
              Customer.customerPW = bcrypt.hashSync(Customer.customerPW, salt);
                // console.log("in customer hash");
                // return new Promise ((resolve, reject) => {
                //   bcrypt.genSalt(10, (err, salt) => {
                //     if (err) {
                //       console.log("at customer gensalt");
                //       console.log(err);
                //       return reject(err);
                //     } else {
                //       bcrypt.hash(Customer.customerPW, salt, (err, hash) => {
                //         if (err) {
                //           console.log("error at customer hash");
                //           console.log(err);
                //         }
                        // console.log(typeof hash);
                        // console.log(typeof Customer.customerPW);
                        // Customer.update({customerPW: hash});
                        // Customer.customerPW = hash;
                        // Customer.setDataValue('customerPW', hash);
                        // console.log(hash);
                        // console.log("at customer");
                        // console.log(Customer.customerPW);
                        // return resolve(Customer, options);
                //       });
                //     }
                //   });
                // })

                // bcrypt.genSalt(10, (err, salt) => {
                //   if (err) {
                //     console.log("at customer gensalt");
                //     console.log(err);
                //   } else {
                //     bcrypt.hash(Customer.customerPW, salt, (err, hash) => {
                //       if (err) {
                //         console.log("error at customer hash");
                //         console.log(err);
                //       }
                //       console.log(typeof hash);
                //       console.log(typeof Customer.customerPW);
                //       Customer.update({customerPW: hash});
                //       // Customer.customerPW = hash;
                //       console.log(hash);
                //       console.log("at customer");
                //       console.log(Customer.customerPW);
                //     });
                //   }
                //   console.log("end");
                // });
            }
        }
    },
    instanceMethods: {
        validPassword: (password, hash) => {
          return bcrypt.compareSync(password, hash);
        }
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
