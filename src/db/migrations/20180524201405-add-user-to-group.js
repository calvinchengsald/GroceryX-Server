'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      // return queryInterface.addColumn(
      //   "Groups",
      //   "groupusers",
      //   {
      //     type: Sequelize.ARRAY(Sequelize.INTEGER),
      //     allowNull: true
      //   }
      // );
  },

  down: (queryInterface, Sequelize) => {

//    return queryInterface.removeColumn("Groups", "users");
  }
};
