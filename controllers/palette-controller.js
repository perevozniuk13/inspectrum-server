const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const palettesData = await knex("palettes");
    res.status(200).json(palettesData);
  } catch (error) {
    res.status(400).send("Error retrieving palettes' data");
  }
};

module.exports = {
  index,
};
