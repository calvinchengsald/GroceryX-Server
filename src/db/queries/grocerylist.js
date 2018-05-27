const User = require("../models").User;
const GroceryList = require("../models").GroceryList;
const GroceryListItem = require("../models").GroceryListItem;
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
        callback(err);
      })
  },

  deleteGroceryList(id, callback){
    GroceryList.findById(id)
    .then((groceryList)=>{
      if(!groceryList){
        let msg = {"success":false,"error" : "list not found"};
        callback(null, msg);
      }
      return GroceryList.destroy({
        where: {id}
      })
      .then((groceryList) => {
        let msg = {"success":true};
        callback(null, msg);
      })
      .catch((err) => {
        callback(err);
      })
    })
    .catch((err)=>{
      callback(err);
    })

   },

  getGroceryList(id, callback){
    return GroceryList.findById(id, {
      include: [
         {model: Group, as :"group"},
         {model: User, as:"owner"},
         {model: GroceryListItem, as: "groceries",
           include: [
             {model: User, as:"buyer" }
           ]
         },
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
    GroceryList.findById(id)
    .then((groceryList) => {
        if(!groceryList){
          let msg = {"success":false,"error" : "list not found"};
          return callback(null,msg);
        }

        groceryList.update(updatedGroceryList, {
          fields: Object.keys(updatedGroceryList)
        })
        .then(() => {
          GroceryList.findById(id)
          .then((updated)=>{
            if(!updated){
              let msg = {"success":false,"error" : "update failed"};
              return callback(null,msg);
            }
            callback(null, updated);
          })
          .catch((err)=>{
            callback(err);
          })
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
