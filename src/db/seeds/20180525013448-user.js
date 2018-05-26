'use strict';


const faker = require("faker");

let users = [];

for(let i = 1 ; i <= 10 ; i++){
 users.push({
   name: faker.name.firstName(),
   password: faker.hacker.noun(),
   username: faker.hacker.verb(),
   createdAt: new Date(),
   updatedAt: new Date()
 });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
