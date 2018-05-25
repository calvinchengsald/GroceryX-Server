const groupQueries = require("../db/queries/group.js");

module.exports = {
  index(req, res, next){
    groupQueries.getAllGroups((err, groups) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("group/index", {groups, title:"bob"});
        }
      })
  },
  new(req, res, next){
      res.render("group/new", {title:"new group"});
  },
  create(req, res, next){
     let newGroup = {
       groupName: req.body.groupName
     };
     groupQueries.addGroup(newGroup, (err, group) => {
       if(err){

           res.end(JSON.stringify(err,null,4));
       } else {
         res.end(JSON.stringify(group,null,4));
       }
     });
   },
   read(req,res,next){

     groupQueries.getGroup(req.params.groupID, (err, group) => {
       if(err){
         res.redirect(500, "/group");
       } else {
           res.render("group/show", {group, title:"new group"});
       }
     });
   },
   postread(req,res,next){

     groupQueries.getGroup(req.params.groupID, (err, group) => {
       if(err){

           res.end(JSON.stringify(err,null,4));
       } else {

           res.end(JSON.stringify(group,null,4));
       }
     });
   },
   delete(req,res,next){
     groupQueries.deleteGroup(req.params.groupID, (err, group) => {
       if(err){

           res.end(JSON.stringify(err,null,4));
       } else {

           res.end(JSON.stringify(group,null,4));
       }
     });
   },
   update(req, res, next){
      let updateGroup = {
        groupName: req.body.groupName
      };
      groupQueries.updateGroup(req.params.groupID, updateGroup, (err, group) => {
        if(err){

            res.end(JSON.stringify(err,null,4));
        } else {

            res.end(JSON.stringify(group,null,4));
        }
      });
    },

    edit(req,res,next){
      groupQueries.getGroup(req.params.groupID, (err, group) => {
        if(err){
          res.redirect(500, "/group");
        } else {
            res.render("group/update", {group, title:"new group"});
        }
      });

    }


}
