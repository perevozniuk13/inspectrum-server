const knex = require("knex")(require("../knexfile"));

const { attachPaginate } = require("knex-paginate");
attachPaginate();

const index = async (req, res) => {
  const currentPage = Number(req.query.page);
  try {
    const palettesData = await knex("palettes").paginate({
      perPage: 10,
      currentPage: currentPage,
      isLengthAware: true,
    });
    palettesData.data.push(palettesData.pagination.lastPage);
    res.status(200).json(palettesData.data);
  } catch (error) {
    res.status(400).send("Error retrieving palettes' data");
  }
};

const addPalette = async (req, res) => {
  if (
    (!req.body.colour1, !req.body.colour2, !req.body.colour3, !req.body.colour4)
  ) {
    return res.status(400).send("All colours must be provided!");
  }

  try {
    const update = await knex("palettes").insert(req.body);
    const updatedPalettesData = await knex("palettes");
    res.status(200).json(updatedPalettesData);
  } catch (error) {
    res.status(400).send("Error adding palette!");
  }
};

const editPalette = async (req, res) => {
  const { paletteId } = req.params;

  try {
    const update = await knex("palettes")
      .where({ id: paletteId })
      .update(req.body);
    const updatedPaletteData = await knex("palettes").where({ id: paletteId });
    res.status(200).json(updatedPaletteData);
  } catch (error) {
    res.status(400).send("Error updating palette!");
  }
};

module.exports = {
  index,
  addPalette,
  editPalette,
};
