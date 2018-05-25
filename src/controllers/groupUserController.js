const groupUserQueries = require("../db/queries/groupUser.js");

module.exports = {
  index(req, res, next){
    groupUserQueries.getAllGroupUsers((err, groupUsers) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("groupUser/index", {groupUsers, title:"bob"});
        }
      })
  },
  new(req, res, next){
      res.render("groupUser/new", {title:"new groupUser"});
  },
  create(req, res, next){
     let newGroupUser = {
       userId: req.body.userId,
       groupId: req.body.groupId
     };
     groupUserQueries.addGroupUser(newGroupUser, (err, groupUser) => {
       if(err){
         console.log(err);
         res.redirect(500, "/groupUser/new");
       } else {
         res.redirect(303, `/groupUser`);
       }
     });
   },
   read(req,res,next){

     groupUserQueries.getGroupUser(req.params.groupUserID, (err, groupUser) => {
       if(err){
         res.redirect(500, "/groupUser");
       } else {
           res.render("groupUser/show", {groupUser, title:"new groupUser"});
       }
     });
   },
   delete(req,res,next){
     groupUserQueries.deleteGroupUser(req.params.groupUserID, (err, groupUser) => {
       if(err){
         console.log(err);
         res.redirect(500, "/groupUser");
       } else {
         res.redirect(303, "/groupUser");
       }
     });
   },
   update(req, res, next){
      let updateGroupUser = {
        groupUserName: req.body.groupUserName,
      };
      groupUserQueries.updateGroupUser(req.params.groupUserID, updateGroupUser, (err, groupUser) => {
        if(err){
          res.redirect(500, `/groupUser/update/${req.params.groupUserID}`);
        } else {
          res.redirect(303, `/groupUser/${groupUser.id}`);
        }
      });
    },

    edit(req,res,next){
      groupUserQueries.getGroupUser(req.params.groupUserID, (err, groupUser) => {
        if(err){
          res.redirect(500, "/groupUser");
        } else {
            res.render("groupUser/update", {groupUser, title:"new groupUser"});
        }
      });

    }


}
