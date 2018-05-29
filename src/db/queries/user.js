const User = require("../models").User;
const GroupUser = require("../models").GroupUser;
const Group = require("../models").Group;
const GroceryList = require("../models").GroceryList;
const GroceryListItem = require("../models").GroceryListItem;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();


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
      where : {username: user.username},
      include: [
         {
           model: GroupUser, as: "groupusers", include: [{model: Group, as: "group" }]
         },
         {model: GroceryList, as : "grocerylists"}
       ]
    })
    .then((data)=>{
      if(!data){
        let msg = {"success":false,"error" : "Username was not found"};
        return callback(null, msg);
      }
      if(!bcrypt.compareSync(user.password,data.password)){
        let msg = {"success":false,"error" : "Incorrect Password"};
        return callback(null, msg);
      }
      return callback(null,data);
    })
    .catch((err)=>{

      let msg = {"success":false,"error" : "user not found"};
      return callback(null, msg);
    })
  },

  getUser(id, callback){
     return User.findById(id, {
       include: [
          {
            model: GroupUser, as: "groupusers", include: [{model: Group, as: "group" }]
          },
          {model: GroceryList, as : "grocerylists"},
          {model: GroceryListItem, as : "grocerylistitems"}
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

   getUserWithUsername(username,callback){
     User.findOne({
       where : {username: username}
     })
     .then((data)=>{
       if(!data){
         let msg = {"success":false,"error" : "user not found"};
         return callback(null, msg);
       }
       return callback(null,data);
     })
     .catch((err)=>{
       let msg = {"success":false,"error" : "user not found"};
       return callback(null, msg);
     })
   },

   updatePassword(leUser,callback){
     User.findOne({
       where : {username: leUser.username}
     })
     .then((data)=>{
       if(!data){
         let msg = {"success":false,"error" : "Could not find user"};
         return callback(null, msg);
       }
       else {
         if(!bcrypt.compareSync(leUser.oldPassword,data.password)){
           let msg = {"success":false,"error" : "Incorrect password"};
           return callback(null, msg);
         }
         console.log(leUser.newPassword);
         let updatedUser={
           password:bcrypt.hashSync(leUser.newPassword,salt)
         };
         data.update(updatedUser, {
           fields: Object.keys(updatedUser)
         })
         .then((afterUser) => {
           return callback(null, afterUser);
         })
         .catch((err) => {
           let msg = {"success":false,"error" : "Problem updating password"};
           return callback(null, msg);
         });
       }
     })
     .catch((err)=>{
       console.log(err);
       let msg = {"success":false,"error" : "Problem with server"};
       return callback(null, msg);
     })
   },

  addUser(newUser, callback){
      //console.log("adduser: " + newUser.name + " " + newUser.password);
      User.findOne({
        where : {username: newUser.username}
      })
      .then((data)=>{
        if(!data){
          User.create({
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
            .then((data2) => {
              if(!data2){
                let msg = {"success":false,"error" : "error creating user"};
                return callback(null, msg);
              }
              return callback(null, data2);
            })
            .catch((err) => {
              return callback(err);
            })
          })
          .catch((err) => {
            return callback(err);
          })
        }
        else {
          let msg = {"success":false,"error" : "This username is not available"};
          return callback(null,msg);
        }
      })
      .catch((err)=>{
        let msg = {"success":false,"error" : "Problem accessing the server"};
        return callback(null, msg);
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
