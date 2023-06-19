const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

router.route("/").get(userController.index);

router.route("/user").get(userController.getUserInfo);

router.route("/palettes").get(userController.getUserPalettes);
router.route("/palettes").post(userController.postUserPalettes);

router.route("/palettes/:paletteId").delete(userController.deleteUserPalette);

router.route("/collections").get(userController.getUserCollections);
router.route("/collections").post(userController.postNewUserCollection);
router
  .route("/collections/:collectionId")
  .post(userController.postUserCollections);
router
  .route("/collections/:collectionId")
  .put(userController.editUserCollection);

router
  .route("/collections/:collectionId")
  .delete(userController.deleteUserCollection);

router
  .route("/collections/:collectionId/palettes")
  .get(userController.getUserCollectionPalettes);

router
  .route("/collections/:collectionId/palettes/:paletteId")
  .delete(userController.deleteUserCollectionPalette);

router.route("/favourites").get(userController.getUserFavourites);

router.route("/favourites").post(userController.postUserFavourites);
router
  .route("/favourites/:favouriteId")
  .delete(userController.deleteUserFavourite);

module.exports = router;
