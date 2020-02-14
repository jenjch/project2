'use strict';

module.exports = {
    up : function (queryInterface, Sequelize) {
    var collections = [];
    var x = 20;
    for (let i = 0; i < 10; i++) { 
        collections.push({
        collection_name: `Collection${i}`,
        description: `This is the test collection ${x}`,
        createdAt : new Date(),
        updatedAt : new Date(),
      });
      x = x + 1;
    }
    return queryInterface.bulkInsert('collections', collections);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.bulkDelete('collections', [{
    collection_name : null
  }])
}
};