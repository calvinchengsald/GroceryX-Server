'use strict';


const faker = require("faker");

let groups = [];

for(let i = 1 ; i <= 10 ; i++){
 groups.push({
   groupName: faker.lorem.word(),
   createdAt: new Date(),
   updatedAt: new Date()
 });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Groups", groups, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Groups", null, {});
  }
};
