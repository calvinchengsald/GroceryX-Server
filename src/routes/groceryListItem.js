const express = require("express");
const router = express.Router();
const groceryListItemController = require("../controllers/groceryListItemController");
const validation = require("./validation");

router.get("/groceryListItem", groceryListItemController.index);
router.get("/groceryListItem/new", groceryListItemController.new);
router.get("/groceryListItem/:groceryListItemID", groceryListItemController.read);
router.get("/groceryListItem/update/:groceryListItemID", groceryListItemController.edit);

router.post("/groceryListItem/create", validation.validateGroceryListItem, groceryListItemController.create);
router.post("/groceryListItem/:groceryListItemID", validation.validateGroceryListItemInt ,groceryListItemController.postread);
router.post("/groceryListItem/delete/:groceryListItemID", validation.validateGroceryListItemInt, groceryListItemController.delete);
router.post("/groceryListItem/update/:groceryListItemID", validation.validateGroceryListItemInt, groceryListItemController.update);


module.exports = router;
