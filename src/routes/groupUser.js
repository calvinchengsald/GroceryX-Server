const express = require("express");
const router = express.Router();
const groupUserController = require("../controllers/groupUserController");

router.get("/groupUser", groupUserController.index);
router.get("/groupUser/new", groupUserController.new);
router.post("/groupUser/create", groupUserController.create);
router.post("/groupUser/leave", groupUserController.leave);
router.get("/groupUser/:groupUserID", groupUserController.read);
router.post("/groupUser/:groupUserID", groupUserController.postread);
router.post("/groupUser/delete/:groupUserID", groupUserController.delete);
router.post("/groupUser/update/:groupUserID", groupUserController.update);
router.get("/groupUser/update/:groupUserID", groupUserController.edit);


module.exports = router;
