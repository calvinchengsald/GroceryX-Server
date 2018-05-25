const express = require("express");
const router = express.Router();
const groceryListItemController = require("../controllers/groceryListItemController");
const validation = require("./validation");

router.get("/groceryListItem", groceryListItemController.index);
router.get("/groceryListItem/new", groceryListItemController.new);
router.post("/groceryListItem/create", validation.validateGroceryListItem, groceryListItemController.create);
router.get("/groceryListItem/:groceryListItemID", groceryListItemController.read);
router.post("/groceryListItem/:groceryListItemID", groceryListItemController.postread);
router.post("/groceryListItem/delete/:groceryListItemID", groceryListItemController.delete);
router.post("/groceryListItem/update/:groceryListItemID", groceryListItemController.update);
router.get("/groceryListItem/update/:groceryListItemID", groceryListItemController.edit);


module.exports = router;
