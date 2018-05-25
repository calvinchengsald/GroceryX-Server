const User = require("../models").User;
const GroupUser = require("../models").GroupUser;
const Group = require("../models").Group;
const GroceryList = require("../models").GroceryList;


module.exports = {

//#1
  getAllGroups(callback){
    return Group.all()

//#2
    .then((group) => {
      callback(null, group);
    })
    .catch((err) => {
      callback(err);
    })
  },


  addGroup(newGroup, callback){
      return Group.create({
        groupName: newGroup.groupName
      })
      .then((group) => {
        callback(null, group);
      })
      .catch((err) => {
      //  console.log(err);
        callback(err);
      })
  },

  deleteGroup(id, callback){
     Group.findById(id)
     .then((group)=>{
       if(!group){
         let msg = {"success":false,"error" : "group not found"};
         return callback(null, msg);
       }
       Group.destroy({
         where: {id}
       })
       .then((group) => {
         let msg = {"success":true};
         return callback(null, msg);
       })
       .catch((err) => {
         callback(err);
       })
     })
     .catch((err)=>{
       callback(err);
     })


   },

  getGroup(id, callback){
    return Group.findById(id, {
      include: [
         {
           model: GroupUser, as: "groupusers", include: [{model: User, as:"user" }]
         },
         {model:GroceryList, as: "grocerylists"}
       ]
     })
     .then((group) => {
       if(!group){
         let msg = {"success":false,"error" : "group not found"};
         return callback(null, msg);
       }
       callback(null, group);
     })
     .catch((err) => {
       callback(err);
     })
  },
  updateGroup(id, updatedGroup, callback) {
    return Group.findById(id)
    .then((group) => {
        if(!group){
          let msg = {"success":false,"error" : "group not found"};
          return callback(null, msg);
        }
        group.update(updatedGroup, {
          fields: Object.keys(updatedGroup)
        })
        .then((updated) => {
          callback(null, updated);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
