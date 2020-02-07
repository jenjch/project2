const DB = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Podcast = sequelize.define("Podcast", {
    // instantiating creates id
    // id: { type: Sequelize.STRING, allowNull: false, defaultValue: true},

    //user can create unique username
    artist: DataTypes.STRING,

    // setting allowNull to false will add NOT NULL to the column, which means an error will be
    // thrown from the DB when the query is executed if the column is null. If you want to check that a value
    // is not null before querying the DB, look at the validations section below.
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    artist: DataTypes.STRING,
    podcastURL: DataTypes.STRING,
    artworkURL: DataTypes.STRING,
    itunes_id: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    imageURL: DataTypes.STRING
  });

  Podcast.associate = function(DB) {
    Podcast.belongsToMany(DB.Collection, { through: "CollectionPodcast" });
  };
  return Podcast;
};
