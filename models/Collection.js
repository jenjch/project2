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

    // foreign keys reference not needed, Sequelize creates automatically
  });

  Collection.associate = function(DB) {
    // creates the joined table CollectionPodcast automatically. Podcasts can belong in any number of Collections.
    Collection.belongsToMany(DB.Podcast, { through: "CollectionPodcast" });
  };
  return Collection;
};
