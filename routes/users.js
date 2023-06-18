const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

router.route("/").get(userController.index);

router.route("/user").get(userController.getUserInfo);

router.route("/palettes").get(userController.getUserPalettes);
router.route("/palettes").post(userController.postUserPalettes);

router.route("/collections").get(userController.getUserCollections);
router
  .route("/collections/:collectionId")
  .post(userController.postUserCollections);

router
  .route("/collections/:collectionId/palettes")
  .get(userController.getUserCollectionPalettes);

// router
//   .route("/:userId/collections/:collectionId/palettes")
//   .post(userController.postUserCollectionPalette);

router.route("/favourites").get(userController.getUserFavourites);

router.route("/favourites").post(userController.postUserFavourites);
// router.route("/:id").get(userController.findOne)
// .patch(userController.update)
// .delete(userController.remove)

// router.route("/:id/posts").get(userController.posts);

module.exports = router;
