const router = require("express").Router();
const paletteController = require("../controllers/palette-controller");

router.route("/").get(paletteController.index);

router.route("/").post(paletteController.addPalette);

router.route("/:paletteId").put(paletteController.editPalette);

module.exports = router;
