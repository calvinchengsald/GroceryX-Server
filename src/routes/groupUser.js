const express = require("express");
const router = express.Router();
const groupUserController = require("../controllers/groupUserController");
const validation = require("./validation");

router.get("/groupUser", groupUserController.index);
router.get("/groupUser/new", groupUserController.new);
router.get("/groupUser/:groupUserID", groupUserController.read);
router.get("/groupUser/update/:groupUserID", groupUserController.edit);

router.post("/groupUser/create",validation.validateGroupUser, groupUserController.create);
router.post("/groupUser/leave",validation.validateGroupUser, groupUserController.leave);
router.post("/groupUser/:groupUserID", validation.validateGroupUserInt, groupUserController.postread);
router.post("/groupUser/delete/:groupUserID", validation.validateGroupUserInt, groupUserController.delete);
router.post("/groupUser/update/:groupUserID", validation.validateGroupUserInt, groupUserController.update);


module.exports = router;
