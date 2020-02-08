const DB = require("../models");
// don't think we need above since we have .associate at the bottom and Const DB is not being used -JC

module.exports = function(sequelize, DataTypes) {
  var Podcast = sequelize.define("Podcast", {
    // instantiating creates id
    // id: { type: Sequelize.STRING, allowNull: false, defaultValue: true},

    //user can create unique username

    // setting allowNull to false will add NOT NULL to the column, which means an error will be
    // thrown from the DB when the query is executed if the column is null. If you want to check that a value
    // is not null before querying the DB, look at the validations section below.
    title: { type: DataTypes.STRING, allowNull: false },
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    language : DataTypes.STRING,
    categories: DataTypes.STRING,
    website: DataTypes.STRING,
    author: DataTypes.STRING,
    itunes_id: DataTypes.INTEGER,
  });

  Podcast.associate = function(DB) {
    Podcast.belongsToMany(DB.Collection, { through: "CollectionPodcast" });
  };
  return Podcast;
};
