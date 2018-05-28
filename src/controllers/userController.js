const userQueries = require("../db/queries/user.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();

module.exports = {
  index(req, res, next){
    userQueries.getAllUsers((err, users) => {

//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("user/index", {users, title:"bob"});
        }
      })
  },
  new(req, res, next){
      res.render("user/new", {title:"new user"});
  },
  create(req, res, next){
     let newUser = {
       name: req.body.name,
       password: bcrypt.hashSync(req.body.password,salt),
       username: req.body.username
     };
     userQueries.addUser(newUser, (err, user) => {
       if(err){
         res.end(JSON.stringify(err,null,4));
       } else {
         res.end(JSON.stringify(user,null,4));
       }
     });
   },
   read(req,res,next){
     userQueries.getUser(req.params.userID, (err, user) => {
       if(err){
         res.redirect(500, "/user");
       } else {
           res.render("user/show", {user, title:"new user"});
       }
     });
   },
   postread(req,res,next){
     userQueries.getUser(req.params.userID, (err, user) => {
       if(err){
         res.end(JSON.stringify(err,null,4));
       } else {

           res.end(JSON.stringify(user,null,4));
       }
     });
   },
   delete(req,res,next){
     userQueries.deleteUser(req.params.userID, (err, user) => {
       if(err){
         console.log(err);
           res.end(JSON.stringify(err,null,4));
       } else {
         res.end(JSON.stringify(user,null,4));
       }
     });
   },
   update(req, res, next){
     if(req.body.password){
       let updateUser = {
         name: req.body.name,
         password: bcrypt.hashSync(req.body.password,salt),
         username: req.body.username
       };
     }
    else {
      let updateUser = {
        name: req.body.name,
        username: req.body.username
      };
    }
      userQueries.updateUser(req.params.userID, updateUser, (err, user) => {
        if(err){
          res.end(JSON.stringify(err,null,4));
        } else {
          res.end(JSON.stringify(user,null,4));
        }
      });
    },

    edit(req,res,next){
      userQueries.getUser(req.params.userID, (err, user) => {
        if(err){
          res.redirect(500, "/user");
        } else {
            res.render("user/update", {user, title:"new user"});
        }
      });

    },

    signIn(req, res, next){
      // console.log(req.body);
      // console.log(req.body.password);
      // console.log(req.body.username);
      let signInUser = {
        password: req.body.password,
        username: req.body.username
      };
      userQueries.signIn(signInUser, (err,user)=>{
        if(err){
          res.end(JSON.stringify(err,null,4));
        } else {
          res.end(JSON.stringify(user,null,4));
        }
      })
    },

    getUserWithUsername(req,res,next){
      userQueries.getUserWithUsername(req.params.username, (err,user)=>{
        if(err){
          res.end(JSON.stringify(err,null,4));
        } else {
          res.end(JSON.stringify(user,null,4));
        }
      })
    },
    updatePassword(req,res,next){
      let leUser = {
        username : req.body.username,
        oldPassword : req.body.oldPassword,
        newPassword : req.body.newPassword
      };
      userQueries.updatePassword(leUser, (err,user)=>{
        if(err){
          res.end(JSON.stringify(err,null,4));
        } else {
          res.end(JSON.stringify(user,null,4));
        }
      })
    }


}
