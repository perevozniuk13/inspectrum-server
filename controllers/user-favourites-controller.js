const knex = require("knex")(require("../knexfile"));

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserFavourites = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const userFavourites = await knex("palettes")
      .join("favourites", "palettes.id", "favourites.palette_id")
      .where({
        "favourites.user_id": verifiedToken.id,
      });
    res.status(200).json(userFavourites);
  } catch (error) {
    console.log(error);
  }
};

const postUserFavourites = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);

    const currentFavourites = await knex("favourites").where({
      palette_id: req.body.palette_id,
      user_id: verifiedToken.id,
    });
    if (currentFavourites.length > 0) {
      return res.send("Palette is already in favourites!");
    }

    const response = await knex("palettes")
      .select("likes")
      .where({ id: req.body.palette_id });
    const currentLikes = JSON.parse(JSON.stringify(response))[0].likes;
    await knex("palettes")
      .where({ id: req.body.palette_id })
      .update({ likes: currentLikes + 1 });

    await knex("favourites").insert({ ...req.body, user_id: verifiedToken.id });

    const updatedFavourites = await knex("favourites").where({
      user_id: verifiedToken.id,
    });
    res.status(200).json(updatedFavourites);
  } catch {
    return res.send("Invalid auth token");
  }
};

const deleteUserFavourite = async (req, res) => {
  const { favouriteId } = req.params;

  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);

    const response1 = await knex("favourites").where({ id: favouriteId });
    const favouritePaletteId = JSON.parse(JSON.stringify(response1))[0]
      .palette_id;

    const response = await knex("palettes")
      .select("likes")
      .where({ id: favouritePaletteId });

    const currentLikes = JSON.parse(JSON.stringify(response))[0].likes;
    await knex("palettes")
      .where({ id: favouritePaletteId })
      .update({ likes: currentLikes - 1 });

    const deletedFavourite = await knex("favourites").where({
      user_id: verifiedToken.id,
      id: favouriteId,
    });
    await knex("favourites")
      .where({
        user_id: verifiedToken.id,
        id: favouriteId,
      })
      .del();
    res.status(200).json(deletedFavourite);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserFavourites,
  postUserFavourites,
  deleteUserFavourite,
};
