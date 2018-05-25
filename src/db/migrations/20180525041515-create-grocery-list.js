'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroceryLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      private: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      groupId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         references: {
           model: "Groups",
           key: "id",
           as: "groupId"
         }
      },
      ownerId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         references: {
           model: "Users",
           key: "id",
           as: "ownerId"
         }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroceryLists');
  }
};
