const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

router.route("/").get(userController.index);

router.route("/user").get(userController.getUserInfo);

router.route("/:userId/palettes").get(userController.getUserPalettes);

// router.route("/:id").get(userController.findOne)
// .patch(userController.update)
// .delete(userController.remove)

// router.route("/:id/posts").get(userController.posts);

module.exports = router;
