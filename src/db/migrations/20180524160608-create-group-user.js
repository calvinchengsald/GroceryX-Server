'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroupUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      userId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         references: {
           model: "Users",
           key: "id",
           as: "userId"
         },
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroupUsers');
  }
};
