const router = require("express").Router();
const userCollectionsController = require("../controllers/user-collections-controller");

router
  .route("/")
  .get(userCollectionsController.getUserCollections)
  .post(userCollectionsController.postNewUserCollection);

router
  .route("/:collectionId")
  .post(userCollectionsController.postUserCollections)
  .put(userCollectionsController.editUserCollection)
  .delete(userCollectionsController.deleteUserCollection);

router
  .route("/:collectionId/palettes")
  .get(userCollectionsController.getUserCollectionPalettes);

router
  .route("/:collectionId/palettes/:paletteId")
  .delete(userCollectionsController.deleteUserCollectionPalette);

module.exports = router;
