const router = require("express").Router();
const paletteController = require("../controllers/palette-controller");



router.route("/").get(paletteController.index);

module.exports = router;