const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const validation = require("./validation");

router.get("/group", groupController.index);
router.get("/group/new", groupController.new);
router.get("/group/:groupID", groupController.read);
router.get("/group/update/:groupID", groupController.edit);


router.post("/group/create",validation.validateGroup, groupController.create);
router.post("/group/:groupID",validation.validateGroupInt, groupController.postread);
router.post("/group/delete/:groupID",validation.validateGroupInt, groupController.delete);
router.post("/group/update/:groupID",validation.validateGroupInt, groupController.update);


module.exports = router;
