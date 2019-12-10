var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.getGoods = callback => {
    Models.Goods.findAll({
      include: [
        {
          model: Models.Cinema,
          as: "cineGoodsId",
          required: true,
          where: {
            cinemaId: Sequelize.col('Goods.cinemaId')
          }
        }
      ]
    })
    .then(result => { 
        console.log("getting goods....");
        return callback(null, result);
    })
    .catch(err => {
        console.log("error");
        console.log(err);
	return callback(err, false);
    });
};

exports.addGoods = (name, count, price, cinema, callback) => {
    Models.Goods.create({
      goodsName: name,
      goodsCount: count,
      goodsPrice: price,
      cinemaId: cinema
    })
    .then(result => { 
        result = {"result" : "ok"};
        return callback(null, result);
    })
    .catch(err => {
        console.log("error");
        console.log(err);
	return callback(err, false);
    });
};

exports.addGoodCounts = (name, count, cinema, callback) => {
    Models.Goods.update(
        {
            goodsCount: Sequelize.literal('goodsCount + ' + count)
        },
        {
            where: {
                [Op.and]: [{ goodsName: name }, { cinemaId: cinema }]
            }
        }
    )
    .then(result => { 
        result = {"result" : "ok"};
        return callback(null, result);
    })
    .catch(err => {
        console.log("error");
        console.log(err);
	return callback(err, false);
    });
};

exports.deleteGoods = (goods, callback) => {
  console.log(goods)
  goods.forEach((good, index) => {
    console.log(good)
    console.log(index)
    if (Object(goods).length === index+1) {
      const res = {"result": "OK"}
      console.log("goods deleted...");
      return callback(null, res);
    }
    console.log("deleting goods...")
    Models.Goods.destroy({
      where: {
        [Op.and]: [{id: good}]
      }
    }, err => {
      if (err) {
        console.log("error");
        console.log(err);
        return callback(err, false);
      }
    });
  });
};