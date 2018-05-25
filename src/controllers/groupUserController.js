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
           res.end(JSON.stringify(err,null,4));
       } else {
         res.end(JSON.stringify(groupUser,null,4));
       }
     });
   },
   read(req,res,next){

     groupUserQueries.getGroupUser(req.params.groupUserID, (err, groupUser) => {
       if(err){
         res.redirect(500, "/groupUser");
       } else {
         res.render("groupUser/show", {group, title:"new groupUser"});

       }
     });
   },
   postread(req,res,next){

     groupUserQueries.getGroupUser(req.params.groupUserID, (err, groupUser) => {
       if(err){
         res.end(JSON.stringify(err,null,4));
       } else {
         res.end(JSON.stringify(groupUser,null,4));

       }
     });
   },
   delete(req,res,next){
     groupUserQueries.deleteGroupUser(req.params.groupUserID, (err, groupUser) => {
       if(err){
         res.end(JSON.stringify(err,null,4));
       } else {
         res.end(JSON.stringify(groupUser,null,4));
       }
     });
   },
   update(req, res, next){
      let updateGroupUser = {
        groupUserName: req.body.groupUserName,
      };
      groupUserQueries.updateGroupUser(req.params.groupUserID, updateGroupUser, (err, groupUser) => {
        if(err){
          res.end(JSON.stringify(err,null,4));

        } else {
          res.end(JSON.stringify(groupUser,null,4));
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
