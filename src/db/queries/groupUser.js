const GroupUser = require("../models").GroupUser;


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
        console.log(err);
        callback(err);
      })
  },

  deleteGroupUser(id, callback){
     return GroupUser.destroy({
       where: {id}
     })
     .then((groupUser) => {
       callback(null, groupUser);
     })
     .catch((err) => {
       callback(err);
     })
   },

  getGroupUser(id, callback){
     return GroupUser.findById(id)
     .then((groupUser) => {
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
          return callback("GroupUser not found");
        }
        groupUser.update(updatedGroupUser, {
          fields: Object.keys(updatedGroupUser)
        })
        .then(() => {
          callback(null, groupUser);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
