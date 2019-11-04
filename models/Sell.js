module.exports = function(sequelize, Datatypes) {
  var Sell = sequelize.define("Sell", {
    sellId: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    sellCount: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    sellPrice: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    sellPayAmount: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });

  Sell.associate = function (models){
    Sell.belongsTo(models.Goods, {
      foreignKey: {
        name: 'cinemaId',
        allowNull: false
      },
      as: 'cineIdGoodsSell'
    });
    Sell.belongsTo(models.Goods, {
      foreignKey: {
        name: 'goodsName',
        allowNull: false
      }
      ,as: 'goodsNameSell'
    });
    Sell.belongsTo(models.Event, {
      foreignKey: {
        name: 'eventId',
        allowNull: false
      },
      as: 'eventIdSell'
    });
  };

  return Sell;
};
