const User = require("../models").User;
const GroceryList = require("../models").GroceryList;
const Group = require("../models").Group;


module.exports = {

//#1
  getAllGroceryLists(callback){
    return GroceryList.all()

//#2
    .then((groceryList) => {
      callback(null, groceryList);
    })
    .catch((err) => {
      callback(err);
    })
  },


  addGroceryList(newGroceryList, callback){
      return GroceryList.create({
        name: newGroceryList.name,
        date: newGroceryList.date,
        groupId: newGroceryList.groupId,
        ownerId: newGroceryList.ownerId,
        private: newGroceryList.private,
      })
      .then((groceryList) => {
        callback(null, groceryList);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
  },

  deleteGroceryList(id, callback){
     return GroceryList.destroy({
       where: {id}
     })
     .then((groceryList) => {
       callback(null, groceryList);
     })
     .catch((err) => {
       callback(err);
     })
   },

  getGroceryList(id, callback){
    return GroceryList.findById(id, {
      include: [
         {model: Group},
         {model: User},
       ]
     })
     .then((groceryList) => {
       callback(null, groceryList);
     })
     .catch((err) => {
       console.log(err);
       callback(err);
     })
  },
  updateGroceryList(id, updatedGroceryList, callback) {
    return GroceryList.findById(id)
    .then((groceryList) => {
        if(!groceryList){
          return callback("GroceryList not found");
        }
        groceryList.update(updatedGroceryList, {
          fields: Object.keys(updatedGroceryList)
        })
        .then(() => {
          callback(null, groceryList);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
