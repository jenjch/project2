'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usercollection', [{ 
      createdAt : new Date(),
      updatedAt : new Date(),
      UserId : 1,
      CollectionId :2,
    }], 
    [{
      createdAt : new Date(),
      updatedAt : new Date(),
      UserId : 3,
      CollectionId :1,
    }], 
    [{
        createdAt : new Date(),
        updatedAt : new Date(),
        UserId : 2,
        CollectionId :5,
      }], 
      [{
        createdAt : new Date(),
        updatedAt : new Date(),
        UserId : 1,
        CollectionId :3,
      }], 
        {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usercollection', [{
      UserId :null
    }])
  }
};