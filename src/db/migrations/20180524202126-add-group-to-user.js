'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      // return queryInterface.addColumn(
      //   "Users",
      //   "groups",
      //   {
      //     type: Sequelize.ARRAY(Sequelize.INTEGER),
      //     allowNull: true
      //   }
      // );
  },

  down: (queryInterface, Sequelize) => {

  //  return queryInterface.removeColumn("Users", "groups");
  }
};
