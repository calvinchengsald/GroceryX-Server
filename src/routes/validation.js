module.exports = {
  validateGroceryListItem(req, res, next) {
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("name", "Name must be at least 3 characters long").isLength({min:3});
    req.checkBody("groceryListId", "Grocery List ID must be an integer").notEmpty().isInt();
    req.checkBody("userId", "UserID must by an integer").notEmpty().isInt();
    req.checkBody("purchased", "Enter purchased boolean").isBoolean();
    const errors = req.validationErrors();

    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));

    }
    else {
      return next();
    }
  },
  validateGroceryListItemInt(req, res, next) {
    req.checkParams("groceryListItemID", "ID must be an integer").isInt();
    if(req.body.name){
      req.checkBody("name", "Name is required").notEmpty();
      req.checkBody("name", "Name must be at least 3 characters long").isLength({min:3});
    }
    if(req.body.groceryListId){
      req.checkBody("groceryListId", "Grocery List ID must be an integer").notEmpty().isInt();
    }
    if(req.body.userId){
      req.checkBody("userId", "UserID must by an integer").notEmpty().isInt();
    }
    if(req.body.purchased){
      req.checkBody("purchased", "purchased must be a boolean").isBoolean();
    }
    if(req.body.budget){
      req.checkBody("budget", "budget must be integer").isInt();
    }

    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));
    }
    else {
      return next();
    }
  },

//    req.checkBody("budget","Please enter a valid number").isInt();
//    req.checkBody("priority", "Please enter a valid priority 1-10").isInt({min:1,max: 10});

  validateUser(req, res, next) {

    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("password", "Password must be at least 6 characters in length").isLength({min: 6});
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("username", "Username must be at least 3 characters in length").isLength({min: 3});
    const errors = req.validationErrors();

    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));

    }
    else {
      return next();
    }
  },
  validateUserUpdate(req, res, next) {
    if(req.body.password){
      req.checkBody("password", "Password is required").notEmpty();
      req.checkBody("password", "Password must be at least 6 characters in length").isLength({min: 6});
    }
    if(req.body.username){
      req.checkBody("username", "Username is required").notEmpty();
      req.checkBody("username", "Username must be at least 3 characters in length").isLength({min: 3});
    }
    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));
    }
    else {
      return next();
    }
  },

  validateGroupUser(req, res, next) {
    req.checkBody("userId", "UserId is required").notEmpty();
    req.checkBody("userId", "UserId must be an integer").isInt();
    req.checkBody("groupId", "GroupId is required").notEmpty();
    req.checkBody("groupId", "GroupId must be an integer").isInt();
    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));
    }
    else {
      return next();
    }
  },
  validateGroupUserInt(req, res, next) {
    req.checkParams("groupUserID", "GroupUser ID must be an integer").isInt();
    if(req.body.userId){
      req.checkBody("userId", "UserId is required").notEmpty();
      req.checkBody("userId", "UserId must be an integer").isInt();
    }
    if(req.body.groupId){
      req.checkBody("groupId", "GroupId is required").notEmpty();
      req.checkBody("groupId", "GroupId must be an integer").isInt();
    }
    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));
    }
    else {
      return next();
    }
  },

  validateGroup(req, res, next) {
    req.checkBody("groupName", "Group Name is required").notEmpty();
    req.checkBody("groupName", "Group Name must be at least 3 characters long").isLength({min:3});
    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));
    }
    else {
      return next();
    }
  },
  validateGroupInt(req, res, next) {
    req.checkParams("groupID", "Group ID must be an integer").isInt();
    if(req.body.groupName){
      req.checkBody("groupName", "Group Name is required").notEmpty();
      req.checkBody("groupName", "Group Name must be at least 3 characters long").isLength({min:3});
    }
    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));
    }
    else {
      return next();
    }
  },

  validateGroceryList(req, res, next) {
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("name", "Name must be at least 3 characters long").isLength({min:3});
    req.checkBody("groupId", "groupId must be an integer").notEmpty().isInt();
    req.checkBody("ownerId", "ownerId must by an integer").notEmpty().isInt();
    req.checkBody("private", "private must be a boolean").isBoolean();
    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));

    }
    else {
      return next();
    }
  },
  validateGroceryListInt(req, res, next) {
    req.checkParams("groceryListID","ID must be an integer").isInt();
    if(req.body.name){
      req.checkBody("name", "Name is required").notEmpty();
      req.checkBody("name", "Name must be at least 3 characters long").isLength({min:3});
    }
    if(req.body.groupId){
      req.checkBody("groupId", "groupId must be an integer").notEmpty().isInt();
    }
    if(req.body.ownerId){
      req.checkBody("ownerId", "ownerId must by an integer").notEmpty().isInt();
    }
    if(req.body.private){
      req.checkBody("private", "private must be a boolean").isBoolean();
    }
    const errors = req.validationErrors();
    if (errors) {
      let msg = {"success":false, "error":errors[0].msg};
      res.end(JSON.stringify(msg,null,4));

    }
    else {
      return next();
    }
  },

}
