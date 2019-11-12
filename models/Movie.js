module.exports = function(sequelize, Datatypes) {
  var Movie = sequelize.define("Movie", {
    movieId: {
      type: Datatypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    censorRating: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: false
    },
    movieName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    movieReleaseYear: {
      type: Datatypes.STRING,
      allowNull: false
    },
    movieRunTime: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  });

  Movie.associate = function(models) {
    Movie.hasMany(models.Schedule, {
      foreignKey: {
        name: "movieId",
        allowNull: false
      },
      as: "movieIdSchedule"
    });
  };

  return Movie;
};
