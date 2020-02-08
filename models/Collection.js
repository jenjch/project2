const DB = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define("Collection", {
    // instantiating creates id
    // id: { type: Sequelize.STRING, allowNull: false, defaultValue: true},

    //user can create unique username
    collection_name: { type: DataTypes.STRING, allowNull: false },

    // setting allowNull to false will add NOT NULL to the column, which means an error will be
    // thrown from the DB when the query is executed if the column is null. If you want to check that a value
    // is not null before querying the DB, look at the validations section below.
    description: { type: DataTypes.STRING, allowNull: false },

    //It is possible to create foreign keys:
    // user_id: {
    //   type: DataTypes.INTEGER,

    //   // references: {
    //   //   // This is a reference to another model
    //   //   model: DB.User,

    //   //   // This is the column name of the referenced model
    //   //   key: "id"
    //   // }
    // }
  });

  Collection.associate = function(DB) {
    Collection.belongsToMany(DB.Podcast, { through: "CollectionPodcast" });
  };
  return Collection;
};
