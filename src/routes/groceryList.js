const express = require("express");
const router = express.Router();
const groceryListController = require("../controllers/groceryListController");

router.get("/groceryList", groceryListController.index);
router.get("/groceryList/new", groceryListController.new);
router.post("/groceryList/create", groceryListController.create);
router.get("/groceryList/:groceryListID", groceryListController.read);
router.post("/groceryList/delete/:groceryListID", groceryListController.delete);
router.post("/groceryList/update/:groceryListID", groceryListController.update);
router.get("/groceryList/update/:groceryListID", groceryListController.edit);


module.exports = router;
