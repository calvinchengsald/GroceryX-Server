const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/group", groupController.index);
router.get("/group/new", groupController.new);
router.post("/group/create", groupController.create);
router.get("/group/:groupID", groupController.read);
router.post("/group/delete/:groupID", groupController.delete);
router.post("/group/update/:groupID", groupController.update);
router.get("/group/update/:groupID", groupController.edit);


module.exports = router;
