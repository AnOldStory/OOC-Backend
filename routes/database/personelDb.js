var Models = require("../../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

exports.getWorkers = callback => {
  Models.Worker.findAll()
    .then(result => {
      console.log("getting schedules...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.checkWorkerPosition = (name, pass, position, callback) => {
  Models.Worker.findOne({
    subQuery: false,
    where: {
      [Op.and]: [{ empName: name }, { empPosition: position }]
    }
  })
  .then((result) => {
    console.log(Object.keys(result._modelOptions.instanceMethods));
    console.log(result.dataValues.empPW);
    if (result._modelOptions.instanceMethods.validPassword(pass, result.dataValues.empPW)) {
      console.log("getting workers...");
      return callback(null, result)
    } else {
    console.log("search failed");
    console.log(err)
    return callback(err, false);
    }
  }).catch(err => {
    console.log("error");
    console.log(err)
    return callback(err, false);
  });
};

exports.getWorkersbyId = (id, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ empId: id }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyDep = (dep, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ depId: dep }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyName = (name, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ empName: name }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyPos = (pos, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ empPosition: pos }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyCin = (cinema, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ cinemaId: cinema }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyDepPos = (dep, pos, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ empDepartment: dep }, { empPosition: pos }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyDepCin = (dep, cinema, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ empDepartment: dep }, { cinemaId: cinema }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyPosCin = (pos, cinema, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ empPosition: pos }, { cinemaId: cinema }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyDepPos = (dep, position, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [{ empDepartment: dep }, { empPosition: position }]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};

exports.getWorkersbyDepPosCin = (dep, position, cinema, callback) => {
  Models.Worker.findAll({
    subQuery: false,
    where: {
      [Op.and]: [
        { empDepartment: dep },
        { empPosition: position },
        { cinemaId: cinema }
      ]
    }
  })
    .then(result => {
      console.log("getting workers...");
      return callback(null, result);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      return callback(err, false);
    });
};
