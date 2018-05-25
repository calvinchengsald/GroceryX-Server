'use strict';


const faker = require("faker");

let groups = [];

for(let i = 1 ; i <= 15 ; i++){
 groups.push({
   name: faker.hacker.noun(),
   groceryListId: i%2+1,
   budget: faker.number,
   purchased: false,
   priority: faker.number,
   userId: i%5+1,
   createdAt: new Date(),
   updatedAt: new Date()
 });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GroceryListItems", groups, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroceryListItems", null, {});
  }
};
