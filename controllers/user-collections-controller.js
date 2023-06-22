const knex = require("knex")(require("../knexfile"));

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserCollections = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const { search_by } = req.query;

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);

    if (search_by === "null" || search_by === "undefined" || !search_by) {
      const userCollections = await knex("collections").where({
        user_id: verifiedToken.id,
      });
      res.status(200).json(userCollections);
    } else {
      const foundCollections = await knex("collections")
        .whereLike("collection_name", `${search_by}%`)
        .orWhereLike(
          "collection_name",
          `${search_by[0].toUpperCase() + search_by.substring(1)}%`
        )
        .where({ user_id: verifiedToken.id });
      res.status(200).json(foundCollections);
    }
  } catch (error) {
    console.log(error);
  }
};

const postUserCollections = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }
  const { collectionId } = req.params;

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const userCollections = await knex("pivot").insert({
      ...req.body,
      collection_id: Number(collectionId),
    });
    res.status(200).json(userCollections);
  } catch (error) {
    console.log(error);
  }
};

const postNewUserCollection = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const userCollections = await knex("collections").insert({
      ...req.body,
      user_id: verifiedToken.id,
    });
    res.status(200).json(userCollections);
  } catch (error) {
    console.log(error);
  }
};

const getUserCollectionPalettes = async (req, res) => {
  const { collectionId } = req.params;
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const userCollectionPalettes = await knex("collections")
      .join("pivot", "pivot.collection_id", "collections.id")
      .join("palettes", "palettes.id", "pivot.palette_id")
      .where({
        "collections.user_id": verifiedToken.id,
        "collections.id": collectionId,
      });
    res.status(200).json(userCollectionPalettes);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserCollection = async (req, res) => {
  const { collectionId } = req.params;

  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const deletedCollection = await knex("collections").where({
      user_id: verifiedToken.id,
      id: collectionId,
    });
    await knex("collections")
      .where({
        user_id: verifiedToken.id,
        id: collectionId,
      })
      .del();
    res.status(200).json(deletedCollection);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserCollectionPalette = async (req, res) => {
  const { collectionId, paletteId } = req.params;

  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const deletedCollectionPalette = await knex("pivot").where({
      collection_id: collectionId,
      palette_id: paletteId,
    });
    await knex("pivot")
      .where({
        collection_id: collectionId,
        palette_id: paletteId,
      })
      .del();
    res.status(200).json(deletedCollectionPalette);
  } catch (error) {
    console.log(error);
  }
};

const editUserCollection = async (req, res) => {
  const { collectionId } = req.params;

  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const response = await knex("collections")
      .where({ id: collectionId, user_id: verifiedToken.id })
      .update(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserCollections,
  postUserCollections,
  getUserCollectionPalettes,
  deleteUserCollection,
  deleteUserCollectionPalette,
  postNewUserCollection,
  editUserCollection,
};
