const knex = require("knex")(require("../knexfile"));

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserPalettes = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const userPalettes = await knex("palettes").where({
      user_id: verifiedToken.id,
    });
    res.status(200).json(userPalettes);
  } catch (error) {
    console.log(error);
  }
};

const postUserPalettes = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }
  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const addedPalette = await knex("palettes").insert({
      ...req.body,
      user_id: verifiedToken.id,
    });
    res.status(200).json(addedPalette[0]);
  } catch {
    return res.send("Invalid auth token");
  }
};

const deleteUserPalette = async (req, res) => {
  const { paletteId } = req.params;

  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const deletedPalette = await knex("palettes")
      .where({
        user_id: verifiedToken.id,
        id: paletteId,
      })
      .first();
    await knex("palettes")
      .where({
        user_id: verifiedToken.id,
        id: paletteId,
      })
      .del();
    res.status(200).json(deletedPalette);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserPalettes,
  postUserPalettes,
  deleteUserPalette,
};
