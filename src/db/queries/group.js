const User = require("../models").User;
const GroupUser = require("../models").GroupUser;
const Group = require("../models").Group;


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
        console.log(err);
        callback(err);
      })
  },

  deleteGroup(id, callback){
     return Group.destroy({
       where: {id}
     })
     .then((group) => {
       callback(null, group);
     })
     .catch((err) => {
       callback(err);
     })
   },

  getGroup(id, callback){
    return Group.findById(id, {
      include: [
         {
           model: GroupUser, as: "groupusers", include: [{model: User }]
         }
       ]
     })
     .then((group) => {
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
          return callback("Group not found");
        }
        group.update(updatedGroup, {
          fields: Object.keys(updatedGroup)
        })
        .then(() => {
          callback(null, group);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
