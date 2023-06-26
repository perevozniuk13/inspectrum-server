const knex = require("knex")(require("../knexfile"));

const { attachPaginate } = require("knex-paginate");
attachPaginate();

const getAllPalettes = async (req, res) => {
  try {
    const allPalettes = await knex("palettes");
    res.status(200).json(allPalettes);
  } catch (error) {
    res.status(400).send("Error retrieving users' data");
  }
};

const index = async (req, res) => {
  const currentPage = Number(req.query.page);

  const { min_hue, max_hue, sort_by, order_by } = req.query;

  try {
    if (min_hue === "null" || max_hue === "null") {
      if (!sort_by || !order_by || sort_by === "null" || order_by === "null") {
        const palettesData = await knex("palettes").paginate({
          perPage: 12,
          currentPage: currentPage,
          isLengthAware: true,
        });
        palettesData.data.push(palettesData.pagination.lastPage);
        res.status(200).json(palettesData.data);
      } else {
        const palettesData = await knex("palettes")
          .orderBy(sort_by, order_by)
          .paginate({
            perPage: 12,
            currentPage: currentPage,
            isLengthAware: true,
          });
        palettesData.data.push(palettesData.pagination.lastPage);
        res.status(200).json(palettesData.data);
      }
    } else if (min_hue == 0) {
      if (!sort_by || !order_by || sort_by === "null" || order_by === "null") {
        const palettesData = await knex("palettes")
          .whereBetween("hue1", [0, 9])
          .orWhereBetween("hue1", [345, 360])
          .orWhereBetween("hue2", [0, 9])
          .orWhereBetween("hue2", [345, 360])
          .orWhereBetween("hue3", [0, 9])
          .orWhereBetween("hue3", [345, 360])
          .orWhereBetween("hue4", [0, 9])
          .orWhereBetween("hue4", [345, 360])
          .paginate({
            perPage: 12,
            currentPage: currentPage,
            isLengthAware: true,
          });
        palettesData.data.push(palettesData.pagination.lastPage);
        res.status(200).json(palettesData.data);
      } else {
        const palettesData = await knex("palettes")
          .orderBy(sort_by, order_by)
          .whereBetween("hue1", [0, 9])
          .orWhereBetween("hue1", [345, 360])
          .orWhereBetween("hue2", [0, 9])
          .orWhereBetween("hue2", [345, 360])
          .orWhereBetween("hue3", [0, 9])
          .orWhereBetween("hue3", [345, 360])
          .orWhereBetween("hue4", [0, 9])
          .orWhereBetween("hue4", [345, 360])
          .paginate({
            perPage: 12,
            currentPage: currentPage,
            isLengthAware: true,
          });
        palettesData.data.push(palettesData.pagination.lastPage);
        res.status(200).json(palettesData.data);
      }
    } else {
      if (!sort_by || !order_by || sort_by === "null" || order_by === "null") {
        const palettesData = await knex("palettes")
          .whereBetween("hue1", [min_hue, max_hue])
          .orWhereBetween("hue2", [min_hue, max_hue])
          .orWhereBetween("hue3", [min_hue, max_hue])
          .orWhereBetween("hue4", [min_hue, max_hue])
          .paginate({
            perPage: 12,
            currentPage: currentPage,
            isLengthAware: true,
          });
        palettesData.data.push(palettesData.pagination.lastPage);
        res.status(200).json(palettesData.data);
      } else {
        const palettesData = await knex("palettes")
          .orderBy(sort_by, order_by)
          .whereBetween("hue1", [min_hue, max_hue])
          .orWhereBetween("hue2", [min_hue, max_hue])
          .orWhereBetween("hue3", [min_hue, max_hue])
          .orWhereBetween("hue4", [min_hue, max_hue])
          .paginate({
            perPage: 12,
            currentPage: currentPage,
            isLengthAware: true,
          });
        palettesData.data.push(palettesData.pagination.lastPage);
        res.status(200).json(palettesData.data);
      }
    }
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
  getAllPalettes,
  addPalette,
  editPalette,
};
