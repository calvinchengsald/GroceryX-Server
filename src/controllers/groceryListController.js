const groceryListQueries = require("../db/queries/groceryList.js");

module.exports = {
  index(req, res, next){
    groceryListQueries.getAllGroceryLists((err, groceryLists) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("groceryList/index", {groceryLists, title:"bob"});
        }
      })
  },
  new(req, res, next){
      res.render("groceryList/new", {title:"new groceryList"});
  },
  create(req, res, next){
     let newGroceryList = {
       name: req.body.name,
       date: new Date(),
       groupId: req.body.groupId,
       ownerId: req.body.ownderId,
       private: req.body.private
     };
     groceryListQueries.addGroceryList(newGroceryList, (err, groceryList) => {
       if(err){
         console.log(err);
         res.redirect(500, "/groceryList/new");
       } else {
         res.redirect(303, "/groceryList");
       }
     });
   },
   read(req,res,next){

     groceryListQueries.getGroceryList(req.params.groceryListID, (err, groceryList) => {
       if(err){
         res.redirect(500, "/groceryList");
       } else {
           res.render("groceryList/show", {groceryList, title:"new groceryList"});
       }
     });
   },
   delete(req,res,next){
     groceryListQueries.deleteGroceryList(req.params.groceryListID, (err, groceryList) => {
       if(err){
         console.log(err);
         res.redirect(500, "/groceryList");
       } else {
         res.redirect(303, "/groceryList");
       }
     });
   },
   update(req, res, next){
      let updateGroceryList = {
        groceryListName: req.body.groceryListName,
      };
      groceryListQueries.updateGroceryList(req.params.groceryListID, updateGroceryList, (err, groceryList) => {
        if(err){
          res.redirect(500, `/groceryList/update/${req.params.groceryListID}`);
        } else {
          res.redirect(303, `/groceryList/${groceryList.id}`);
        }
      });
    },

    edit(req,res,next){
      groceryListQueries.getGroceryList(req.params.groceryListID, (err, groceryList) => {
        if(err){
          res.redirect(500, "/groceryList");
        } else {
            res.render("groceryList/update", {groceryList, title:"new groceryList"});
        }
      });

    }


}
