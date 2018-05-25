module.exports = {
  validateGroceryListItem(req, res, next) {


    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("groceryListId", "Grocery List does not exist").notEmpty().isInt();
    req.checkBody("purchased", "Enter purchased boolean").isBoolean();
    req.checkBody("priority", "Please enter a valid priority 1-10").isInt({min:1,max: 10});


    const errors = req.validationErrors();

    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));

    }
    else {
      return next();
    }
  }
}
