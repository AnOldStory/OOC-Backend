"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("../config/config");
var sequelize = new Sequelize(
  config.DATABASE.database,
  config.DATABASE.user,
  config.DATABASE.password,
  {
    host: config.DATABASE.host,
    dialect: "mysql"
  }
);
var db = {};

var db = {};

var generic_names = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"];
var generic_dep_names = ["Tanker", "Manhunter", "Sharpshooter", "Goucho", "Netrunner"]
var generic_human_names = ["Anna", "Boris", "Vasily", "Gregory", "Dmitri", "Yelena", "Zhenya", "Zinaida",
                           "Ivan", "Konstatine"];
var generic_human_names2 = ["Adana", "Bolu", "Ceyhan", "Canakkale", "Denizli",
                            "Edirne", "Fatsa", "Giresun", "Hatay", "Isparta"];                          
var generic_movie_names = ["Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima",
                           "Mike", "November", "Oscar"];                    
var generic_names2 = ["Gireogi", "Napoli", "Doraji", "Roma", "Minari"];
var result;
var i, j, k;

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

var dbInit = async function(){
  console.log("Checking if DB is empty...");
  result = await db['Cinema'].findAll();

  if (result.length === 0){
    console.log("Initializing Database...");
    
    for (i=1; 10>=i; i++){
      db['Customer'].create({
        customerName: generic_human_names2[Math.floor(Math.random()*10)] + " " + generic_human_names[Math.floor(Math.random()*10)],
        customerRank: Math.floor(Math.random()*6),
        customerBirth: "NONEOFURFUCKINGBUSINESS",
        customerPhone: i,
        customerEmail: "NONEOFURFUCKINGBUSINESS"
      });
      
      db['Movie'].create({
        movieName: generic_movie_names[i-1],
        censorRating: 'VERYHARDCORE',
        movieReleaseYear: 'NONEOFURFUCKINGBUSINESS',
        movieRunTime: Math.floor(Math.random()*10)*10
      });
    }

    for(i=1; 5>=i; i++){
      db['Department'].create({
        depName: generic_dep_names[i-1],
        depRank: i
      });
    }
    
    for (i=1; 5>=i; i++){
      db['Cinema'].create({
        cinemaName: generic_names[i-1],
        cinemaAddress: generic_names2[i-1]
      });

      for (j=1; 5>=j; j++){
        db['ShowRoom'].create({
          cinemaId: i
        });
        for (k=1; 50>=k; k++){
          db['Seat'].create({
            cinemaId: i,
            showRoomId: j
          });
        }
      }
      for (j=1; 10>=j; j++){
        db['Worker'].create({
          cinemaId: i,
          depId: Math.floor(Math.random()*5),
          empName: generic_human_names[Math.floor(Math.random()*10)] + " " + generic_human_names2[Math.floor(Math.random()*10)],
          empSalary: Math.floor(Math.random()*10)*1000,
          empPosition: "Position " + i
        });
      }
    }
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.dbInit = dbInit;

module.exports = db;


