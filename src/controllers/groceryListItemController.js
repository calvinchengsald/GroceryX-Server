const groceryListItemQueries = require("../db/queries/groceryListItem.js");

module.exports = {
  index(req, res, next){
    groceryListItemQueries.getAllGroceryListItems((err, groceryListItems) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("groceryListItem/index", {groceryListItems, title:"bob"});
        }
      })
  },
  new(req, res, next){
      res.render("groceryListItem/new", {title:"new groceryListItem"});
  },
  create(req, res, next){
     let newGroceryListItem = {
       name: req.body.name,
       budget: req.body.budget,
       purchased: req.body.purchased,
       priority: req.body.priority,
       groceryListId: req.body.groceryListId,
       userId: req.body.userId,
     };
     groceryListItemQueries.addGroceryListItem(newGroceryListItem, (err, groceryListItem) => {
       if(err){
      //   console.log(err);
             res.end(JSON.stringify(err,null,4));
       } else {
           res.end(JSON.stringify(groceryListItem,null,4));
       }
     });
   },
   read(req,res,next){

     groceryListItemQueries.getGroceryListItem(req.params.groceryListItemID, (err, groceryListItem) => {
       if(err){
         res.redirect(500, "/groceryListItem");
       } else {
           res.render("groceryListItem/show", {groceryListItem, title:"new groceryListItem"});
       }
     });
   },
   postread(req,res,next){

     groceryListItemQueries.getGroceryListItem(req.params.groceryListItemID, (err, groceryListItem) => {
       if(err){
           res.end(JSON.stringify(err,null,4));
       } else {
           res.end(JSON.stringify(groceryListItem,null,4));
       }
     });
   },
   delete(req,res,next){
     groceryListItemQueries.deleteGroceryListItem(req.params.groceryListItemID, (err, groceryListItem) => {
       if(err){
           res.end(JSON.stringify(err,null,4));
       } else {
           res.end(JSON.stringify(groceryListItem,null,4));
       }
     });
   },
   update(req, res, next){
      let updateGroceryListItem = {
        name: req.body.name,
        budget: req.body.budget,
        purchased: req.body.purchased,
        priority: req.body.priority,
        groceryListId: req.body.groceryListId,
        userId: req.body.userId,
      };
      groceryListItemQueries.updateGroceryListItem(req.params.groceryListItemID, updateGroceryListItem, (err, groceryListItem) => {
        if(err){
            res.end(JSON.stringify(err,null,4));
        } else {
            res.end(JSON.stringify(groceryListItem,null,4));
        }
      });
    },

    edit(req,res,next){
      groceryListItemQueries.getGroceryListItem(req.params.groceryListItemID, (err, groceryListItem) => {
        if(err){
          res.redirect(500, "/groceryListItem");
        } else {
            res.render("groceryListItem/update", {groceryListItem, title:"new groceryListItem"});
        }
      });

    }


}
