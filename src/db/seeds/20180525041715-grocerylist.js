'use strict';


const faker = require("faker");

let groceryList = [];

//for(let i = 1 ; i <= 15 ; i++){
 groceryList.push({
   name: "Shopping",
   date: new Date(),
   createdAt: new Date(),
   updatedAt: new Date(),
   private: true,
   groupId: 1,
   ownerId: 1
 });

 groceryList.push({
   name: "Walmart",
   date: new Date(),
   createdAt: new Date(),
   updatedAt: new Date(),
   private: false,
   groupId: 2,
   ownerId: 1
 });



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GroceryLists", groceryList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroceryLists", groceryList, {});
  }
};
