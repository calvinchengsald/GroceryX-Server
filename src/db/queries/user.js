const User = require("../models").User;
const GroupUser = require("../models").GroupUser;
const Group = require("../models").Group;
const GroceryList = require("../models").GroceryList;


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
  signIn(user,callback){
    User.findOne({
      where : {username: user.username, password : user.password},
      include: [
         {
           model: GroupUser, as: "groupusers", include: [{model: Group, as: "group" }]
         },
         {model: GroceryList, as : "grocerylists"}
       ]
    })
    .then((data)=>{
      callback(null,data);
    })
    .catch((err)=>{

      let msg = {"success":false,"error" : "user not found"};
      return callback(null, msg);
      callback(err);
    })
  },

  getUser(id, callback){
     return User.findById(id, {
       include: [
          {
            model: GroupUser, as: "groupusers", include: [{model: Group, as: "group" }]
          },
          {model: GroceryList, as : "grocerylists"}
        ]
      })

     .then((user) => {
       if(!user){
         let msg = {"success":false,"error" : "user not found"};
         return callback(null, msg);
       }
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
        password: newUser.password,
        username: newUser.username
      })
      .then((user) => {
        User.findById(user.id, {
          include: [
             {
               model: GroupUser, as: "groupusers", include: [{model: Group, as: "group" }]
             },
             {model: GroceryList, as : "grocerylists"}
           ]
         })
        .then((data) => {
          if(!data){
            let msg = {"success":false,"error" : "error creating user"};
            return callback(null, msg);
          }
          return callback(null, data);
        })
        .catch((err) => {
          return callback(err);
        })
      })
      .catch((err) => {
        return callback(err);
      })
  },

  deleteUser(id, callback){
    User.findById(id)
    .then((user)=>{
      if(!user){
        let msg = {"success":false,"error" : "user not found"};
        return callback(null, msg);
      }
      User.destroy({
         where: {id}
       })
       .then((user) => {

           let msg = {"success":true};
           return callback(null, msg);
       })
       .catch((err) => {
         callback(err);
       })

    })
    .catch((err)=>{
      console.log(err);
      callback(err);
    })

   },

  updateUser(id, updatedUser, callback) {
    return User.findById(id)
    .then((user) => {
        if(!user){
          let msg = {"success":false,"error" : "user not found"};
          return callback(null, msg);
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
