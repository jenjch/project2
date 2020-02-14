module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // instantiating creates id
    // id: { type: Sequelize.STRING, allowNull: false, defaultValue: true},

    //user can create unique username
    username: { type: DataTypes.TEXT, allowNULL: false },

    // setting allowNull to false will add NOT NULL to the column, which means an error will be
    // thrown from the DB when the query is executed if the column is null. If you want to check that a value
    // is not null before querying the DB, look at the validations section below.
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false }
  });
  User.associate = function(DB) {
    // creates the joined table UserCollection automatically. A User can can have a number of Collections. And multiple users can potentially have the same collections.
    User.belongsToMany(DB.Collection, { through: "UserCollection" });
  };

  return User;
};
