const userQueries = require("../db/queries/user.js");

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
       password: req.body.password
     };
     userQueries.addUser(newUser, (err, user) => {
       if(err){
         res.redirect(500, "/user/new");
       } else {
         res.redirect(303, `/user`);
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
   delete(req,res,next){
     userQueries.deleteUser(req.params.userID, (err, user) => {
       if(err){
         console.log(err);
         res.redirect(500, "/user");
       } else {
         res.redirect(303, "/user");
       }
     });
   },
   update(req, res, next){
      let updateUser = {
        name: req.body.name,
        password: req.body.password
      };
      userQueries.updateUser(req.params.userID, updateUser, (err, user) => {
        if(err){
          res.redirect(500, `/user/update/${req.params.userID}`);
        } else {
          res.redirect(303, `/user/${user.id}`);
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

    }


}
