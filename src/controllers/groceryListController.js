const groceryListQueries = require("../db/queries/groceryList.js");

module.exports = {

  create(req, res, next){
     let newGroceryList = {
       name: req.body.name,
       date: new Date(),
       groupId: req.body.groupId,
       ownerId: req.body.ownerId,
       private: req.body.private
     };
     groceryListQueries.addGroceryList(newGroceryList, (err, groceryList) => {
       if(err){
         res.end(JSON.stringify(err,null,4));
         //res.redirect(500, "/groceryList/new");
       } else {
         res.end(JSON.stringify(groceryList,null,4));
         //res.redirect(303, "/groceryList");
       }
     });
   },

   postread(req,res,next){

     groceryListQueries.getGroceryList(req.params.groceryListID, (err, groceryList) => {
       if(err){
           res.end(JSON.stringify(err,null,4));
         //res.redirect(500, "/groceryList");
       } else {
         res.end(JSON.stringify(groceryList,null,4));
          //res.end(JSON.stringify(groceryList,null,4));
          // res.render("groceryList/show", {groceryList, title:"new groceryList"});
       }
     });
   },

   delete(req,res,next){
     groceryListQueries.deleteGroceryList(req.params.groceryListID, (err, groceryList) => {
       if(err){
         res.end(JSON.stringify(err,null,4));
         //res.redirect(500, "/groceryList");
       } else {
         res.end(JSON.stringify(groceryList,null,4));
         //res.redirect(303, "/groceryList");
       }
     });
   },
   update(req, res, next){
      let updateGroceryList = {
        name: req.body.name,
        date: req.body.date,
        groupId: req.body.groupId,
        ownerId: req.body.ownerId,
        private: req.body.private
      };
    //  console.log(updateGroceryList.name);
      groceryListQueries.updateGroceryList(req.params.groceryListID, updateGroceryList, (err, groceryList) => {
        if(err){

          res.end(JSON.stringify(err,null,4));
          //res.redirect(500, `/groceryList/update/${req.params.groceryListID}`);
        } else {
            res.end(JSON.stringify(groceryList,null,4));
          //res.redirect(303, `/groceryList/${groceryList.id}`);
        }
      });
    },


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

    read(req,res,next){

      groceryListQueries.getGroceryList(req.params.groceryListID, (err, groceryList) => {
        if(err){
          res.redirect(500, "/groceryList");
        } else {

            res.render("groceryList/show", {groceryList, title:"new groceryList"});
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
