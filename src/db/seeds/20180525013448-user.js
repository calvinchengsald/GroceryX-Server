'use strict';

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();

const faker = require("faker");

let users = [];
let pw = [];
for(let i = 1 ; i <= 10 ; i++){
  pw.push(faker.hacker.noun());
 users.push({
   name: faker.name.firstName(),
   password: bcrypt.hashSync(pw[i-1], salt),
   username: faker.hacker.verb(),
   createdAt: new Date(),
   updatedAt: new Date()
 });
}
console.log(pw);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
