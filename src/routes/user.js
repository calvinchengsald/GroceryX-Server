const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/user", userController.index);
router.get("/user/new", userController.new);
router.post("/user/create", userController.create);
router.post("/user/signIn", userController.signIn);
router.post("/user/search/username/:username", userController.getUserWithUsername);
router.get("/user/:userID", userController.read);
router.post("/user/:userID", userController.postread);
router.post("/user/delete/:userID", userController.delete);
router.post("/user/update/:userID", userController.update);
router.get("/user/update/:userID", userController.edit);


module.exports = router;
