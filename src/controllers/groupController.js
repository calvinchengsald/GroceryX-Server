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
         console.log(err);
         res.redirect(500, "/group/new");
       } else {
         res.redirect(303, "/group");
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
   delete(req,res,next){
     groupQueries.deleteGroup(req.params.groupID, (err, group) => {
       if(err){
         console.log(err);
         res.redirect(500, "/group");
       } else {
         res.redirect(303, "/group");
       }
     });
   },
   update(req, res, next){
      let updateGroup = {
        groupName: req.body.groupName,
      };
      groupQueries.updateGroup(req.params.groupID, updateGroup, (err, group) => {
        if(err){
          res.redirect(500, `/group/update/${req.params.groupID}`);
        } else {
          res.redirect(303, `/group/${group.id}`);
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
