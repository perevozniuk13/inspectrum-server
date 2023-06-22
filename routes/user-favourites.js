const router = require("express").Router();
const userFavouritesController = require("../controllers/user-favourites-controller");

router
  .route("/")
  .get(userFavouritesController.getUserFavourites)
  .post(userFavouritesController.postUserFavourites);
router
  .route("/:favouriteId")
  .delete(userFavouritesController.deleteUserFavourite);

module.exports = router;
