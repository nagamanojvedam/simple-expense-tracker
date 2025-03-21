const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/setavatar/:userId", userController.setAvatar);

router.route("/").get(userController.getAllUsers);

module.exports = router;
