module.exports = function(sequelize, Datatypes) {
  var Goods = sequelize.define("Goods", {
    goodsName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    count: {
      type: Datatypes.BIGINT,
      allowNull: false
    },
    price: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });

  Goods.associate = function (models){
    Goods.belongsTo(models.Cinema, {
      foreignKey: {
        name: 'cinemaId',
        allowNull: false
      },
      as: 'cineIdGoods'
    });
    Goods.hasMany(models.Sell, {
      foreignKey: {
        name: 'cinemaId',
        allowNull: false
      },
      as: 'cineIdGoodsSell'
    });
    Goods.hasMany(models.Sell, {
      foreignKey: {
        name: 'goodsName',
        allowNull: false
      },
      as: 'goodsNameSell'
    });
  };

  return Goods;
};
