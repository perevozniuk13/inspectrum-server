const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

router.route("/").get(userController.index);

router.route("/user").get(userController.getUserInfo);

router.route("/:userId/palettes").get(userController.getUserPalettes);

router.route("/:userId/collections").get(userController.getUserCollections);

router
  .route("/:userId/collections/:collectionId/palettes")
  .get(userController.getUserCollectionPalettes);

// router
//   .route("/:userId/collections/:collectionId/palettes")
//   .post(userController.postUserCollectionPalette);

router.route("/:userId/favourites").get(userController.getUserFavourites);

router.route("/:userId/favourites").post(userController.postUserFavourites);
// router.route("/:id").get(userController.findOne)
// .patch(userController.update)
// .delete(userController.remove)

// router.route("/:id/posts").get(userController.posts);

module.exports = router;
