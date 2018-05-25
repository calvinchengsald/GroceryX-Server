const User = require("../models").User;
const GroceryListItem = require("../models").GroceryListItem;
const Group = require("../models").Group;


module.exports = {

//#1
  getAllGroceryListItems(callback){
    return GroceryListItem.all()

//#2
    .then((groceryListItem) => {
      callback(null, groceryListItem);
    })
    .catch((err) => {
      console.log("an err");
      callback(err);
    })
  },


  addGroceryListItem(newGroceryListItem, callback){
      return GroceryListItem.create({
        name: newGroceryListItem.name,
        groceryListId: newGroceryListItem.groceryListId,
        userId: newGroceryListItem.userId,
        budget: newGroceryListItem.budget,
        purchased: newGroceryListItem.purchased,
        priority: newGroceryListItem.priority,
      })
      .then((groceryListItem) => {
        callback(null, groceryListItem);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
  },

  deleteGroceryListItem(id, callback){
     return GroceryListItem.destroy({
       where: {id}
     })
     .then((groceryListItem) => {
       callback(null, groceryListItem);
     })
     .catch((err) => {
       callback(err);
     })
   },

  getGroceryListItem(id, callback){
    return GroceryListItem.findById(id, {
      include: [
         {model: Group},
         {model: User},
       ]
     })
     .then((groceryListItem) => {
       callback(null, groceryListItem);
     })
     .catch((err) => {
       console.log(err);
       callback(err);
     })
  },
  updateGroceryListItem(id, updatedGroceryListItem, callback) {
    return GroceryListItem.findById(id)
    .then((groceryListItem) => {
        if(!groceryListItem){
          return callback("GroceryListItem not found");
        }
        groceryListItem.update(updatedGroceryListItem, {
          fields: Object.keys(updatedGroceryListItem)
        })
        .then(() => {
          callback(null, groceryListItem);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
