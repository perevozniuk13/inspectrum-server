const router = require("express").Router();
const userPalettesController = require("../controllers/user-palettes-controller");

router
  .route("/")
  .get(userPalettesController.getUserPalettes)
  .post(userPalettesController.postUserPalettes);

router.route("/:paletteId").delete(userPalettesController.deleteUserPalette);

module.exports = router;
