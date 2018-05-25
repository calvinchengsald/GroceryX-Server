'use strict';


const faker = require("faker");

let groceryListItems = [];

for(let i = 1 ; i <= 15 ; i++){
 groceryListItems.push({
   name: faker.hacker.noun(),
   groceryListId: i%2+1,
   budget: i,
   purchased: false,
   priority: i%10,
   userId: i%5+1,
   createdAt: new Date(),
   updatedAt: new Date()
 });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GroceryListItems", groceryListItems, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroceryListItems", null, {});
  }
};
