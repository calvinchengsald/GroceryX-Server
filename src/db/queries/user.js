const User = require("../models").User;
const GroupUser = require("../models").GroupUser;
const Group = require("../models").Group;


module.exports = {

//#1
  getAllUsers(callback){
    return User.all()

//#2
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback){
     return User.findById(id, {
       include: [
          {
            model: GroupUser, as: "groupusers", include: [{model: Group }]
          }
        ]
    })

     .then((user) => {
       callback(null, user);
     })
     .catch((err) => {
       callback(err);
     })
   },


  addUser(newUser, callback){
      //console.log("adduser: " + newUser.name + " " + newUser.password);

      return User.create({
        name: newUser.name,
        password: newUser.password
      })
      .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
  },

  deleteUser(id, callback){
     return User.destroy({
       where: {id}
     })
     .then((user) => {
       callback(null, user);
     })
     .catch((err) => {
       callback(err);
     })
   },

  updateUser(id, updatedUser, callback) {
    return User.findById(id)
    .then((user) => {
        if(!user){
          return callback("User not found");
        }
        user.update(updatedUser, {
          fields: Object.keys(updatedUser)
        })
        .then(() => {
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        });
    });
  }

}
