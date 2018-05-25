'use strict';


const faker = require("faker");

let groupuser = [];

//for(let i = 1 ; i <= 15 ; i++){
 groupuser.push({
   userId: 1,
   groupId: 1,
   createdAt: new Date(),
   updatedAt: new Date()
 });
 groupuser.push({
   userId: 1,
   groupId: 2,
   createdAt: new Date(),
   updatedAt: new Date()
 });
 groupuser.push({
   userId: 1,
   groupId: 3,
   createdAt: new Date(),
   updatedAt: new Date()
 });
 groupuser.push({
   userId: 2,
   groupId: 1,
   createdAt: new Date(),
   updatedAt: new Date()
 });


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GroupUsers", groupuser, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroupUsers", groupuser, {});
  }
};
