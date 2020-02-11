'use strict';

module.exports = {
    up : function (queryInterface, Sequelize) {
    var users = [];
    var x = 2020;
    for (let i = 0; i < 10; i++) { 
        users.push({
        username: `User${i}`,
        first_name: `John${x}`,
        last_name: `Barr${i}`,
        createdAt : new Date(),
        updatedAt : new Date(),
      });
      x = x + 1;
    }
    return queryInterface.bulkInsert('users', users);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.bulkDelete('users', [{
    username : null
  }])
}
};
   

