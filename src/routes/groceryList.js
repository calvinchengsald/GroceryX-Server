const express = require("express");
const router = express.Router();
const groceryListController = require("../controllers/groceryListController");
const validation = require("./validation");

router.get("/groceryList", groceryListController.index);
router.get("/groceryList/new", groceryListController.new);
router.get("/groceryList/:groceryListID", groceryListController.read);
router.get("/groceryList/update/:groceryListID", groceryListController.edit);

router.post("/groceryList/create", validation.validateGroceryList, groceryListController.create);
router.post("/groceryList/:groceryListID",  validation.validateGroceryListInt, groceryListController.postread);
router.post("/groceryList/delete/:groceryListID",  validation.validateGroceryListInt, groceryListController.delete);
router.post("/groceryList/update/:groceryListID",  validation.validateGroceryListInt, groceryListController.update);


module.exports = router;
