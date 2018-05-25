const Group = require("../models").Group;
const User = require("../models").User;
const GroceryListItem = require("../models").GroceryListItem;
const GroceryList = require("../models").GroceryList;


module.exports = {

//#1
  getAllGroceryListItems(callback){
    return GroceryListItem.all()

//#2
    .then((groceryListItem) => {
      callback(null, groceryListItem);
    })
    .catch((err) => {

      console.log(err);
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
        callback(err);
      })
  },

  deleteGroceryListItem(id, callback){
    GroceryListItem.findById(id)
    .then((data)=>{
      if(!data){
        let msg = {"success":false,"error" : "item not found"};
        return callback(null,msg);
      }
        GroceryListItem.destroy({
         where: {id}
       })
       .then((groceryListItem) => {
         let msg = {"success":true};
         return callback(null,msg);
       })
       .catch((err) => {
         callback(err);
       })
    })

   },

  getGroceryListItem(id, callback){
    return GroceryListItem.findById(id, {
      include: [
         {model: GroceryList, as:"grocerylist",
            include: [
              {model: User, as:"owner" },
              {model: Group, as:"group" }
            ]
         },
         {model: User, as:"buyer"}
       ]
     })
     .then((groceryListItem) => {
       if(!groceryListItem){
         let msg = {"success":false,"error" : "item not found"};
         return callback(null,msg);
       }
       callback(null, groceryListItem);
     })
     .catch((err) => {
      // console.log(err);
       callback(err);
     })
  },
  updateGroceryListItem(id, updatedGroceryListItem, callback) {
    return GroceryListItem.findById(id)
    .then((groceryListItem) => {
    //    console.log(updatedGroceryListItem.name);
        if(!groceryListItem){
          let msg = {"success":false,"error" : "item not found"};
          return callback(null,msg);
        }
        groceryListItem.update(updatedGroceryListItem, {
          fields: Object.keys(updatedGroceryListItem)
        })
        .then((data) => {
          callback(null, data);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
