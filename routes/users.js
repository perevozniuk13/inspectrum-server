const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

router.route("/").get(userController.index);

router.route("/user").get(userController.getUserInfo);

module.exports = router;
