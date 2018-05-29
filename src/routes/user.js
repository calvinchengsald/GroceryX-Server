const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/user", userController.index);
router.get("/user/new", userController.new);
router.get("/user/:userID", userController.read);
router.get("/user/update/:userID", userController.edit);


router.post("/user/create",validation.validateUser, userController.create);
router.post("/user/signIn", userController.signIn);
router.post("/user/search/username/:username", userController.getUserWithUsername);
router.post("/user/:userID",validation.validateUserInt, userController.postread);
router.post("/user/delete/:userID",validation.validateUserInt, userController.delete);
router.post("/user/update/:userID",validation.validateUserInt, userController.update);
router.post("/user/update/:userID/password",validation.validateUserInt, userController.updatePassword);


module.exports = router;
