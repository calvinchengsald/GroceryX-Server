const GroupUser = require("../models").GroupUser;
const Group = require("../models").Group;
const User = require("../models").User;


module.exports = {

//#1
  getAllGroupUsers(callback){
    return GroupUser.all()

//#2
    .then((groupUser) => {
      callback(null, groupUser);
    })
    .catch((err) => {
      callback(err);
    })
  },


  addGroupUser(newGroupUser, callback){
      return GroupUser.create({
        groupId: newGroupUser.groupId,
        userId: newGroupUser.userId
      })
      .then((groupUser) => {
        callback(null, groupUser);
      })
      .catch((err) => {
        callback(err);
      })
  },

  deleteGroupUser(id, callback){
      GroupUser.findById(id)
      .then((groupUser)=>{
        if(!groupUser){

            let msg = {"success":false,"error" : "Group User not found"};
            return callback(null, msg);
        }
        GroupUser.destroy({
         where: {id}
         })
         .then((groupUser) => {
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


   leave(leaveReq, callback){
     GroupUser.findOne({
       where : {userId: leaveReq.userId, groupId : leaveReq.groupId},

     })
     .then((data)=>{
       if(!data){
         let msg = {"success":false,"error" : "This User-Group was not found"};
         return callback(null, msg);
       }
       else {
         let id = data.id;
         GroupUser.destroy({
          where: {id}
          })
          .then((groupUser) => {
            let msg = {"success":true};
            return callback(null, msg);
          })
          .catch((err) => {
            callback(err);
          })
       }
     })
     .catch((err)=>{
       let msg = {"success":false,"error" : "This User-Group was not found"};
       return callback(null, msg);
     })

   },

  getGroupUser(id, callback){
     return GroupUser.findById(id,{
       include: [

          {model:User, as: "user"},
          {model:Group, as: "group"}
        ]
     })
     .then((groupUser) => {
       if(!groupUser){
         let msg = {"success":false,"error" : "Group User not found"};
         return callback(null, msg);
       }
       callback(null, groupUser);
     })
     .catch((err) => {
       callback(err);
     })
  },
  updateGroupUser(id, updatedGroupUser, callback) {
    return GroupUser.findById(id)
    .then((groupUser) => {
        if(!groupUser){
          let msg = {"success":false,"error" : "Group User not found"};
          return callback(null, msg);
        }
        groupUser.update(updatedGroupUser, {
          fields: Object.keys(updatedGroupUser)
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
