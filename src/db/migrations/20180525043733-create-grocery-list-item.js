'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroceryListItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.INTEGER
      },
      purchased: {
        type: Sequelize.BOOLEAN
      },
      priority: {
        type: Sequelize.INTEGER
      },
      groceryListId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         references: {
           model: "GroceryLists",
           key: "id",
           as: "groceryListId"
         }
      },
      userId: {
         type: Sequelize.INTEGER,
         references: {
           model: "Users",
           key: "id",
           as: "userId"
         }
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroceryListItems');
  }
};
