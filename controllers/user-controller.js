const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
  try {
    const usersData = await knex("users");
    res.status(200).json(usersData);
  } catch (error) {
    res.status(400).send("Error retrieving users' data");
  }
};

const signup = async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  console.log(typeof password);

  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).send("Please provide all user info");
  }

  const hashedPassword = bcrypt.hashSync(password);

  try {
    await knex("users").insert({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send("Signed up successfully!");
  } catch (error) {
    res.status(400).send("Sign up failed!");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Please provide username and password!");
  }

  try {
    const user = await knex("users").where({ username }).first();
    if (!user) {
      return res.status(400).send("Invalid user!");
    }

    if (!bcrypt.compare(user.password, bcrypt.hashSync(password))) {
      return res.status(400).send("Invalid password!");
    }

    const authToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).send({ authToken });
  } catch (error) {
    res.status(400).send("Log in failed!");
  }
};

const getUserInfo = async (req, res) => {
  if (!req.headers.authorization) {
    console.log("auth header", req.headers.authToken);
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);

    const user = await knex("users").where({ id: verifiedToken.id }).first();
    res.status(200).json(user);
  } catch {
    return res.send("Invalid auth token");
  }
};

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

const getUserCollections = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const userCollections = await knex("collections").where({
      user_id: verifiedToken.id,
    });
    res.status(200).json(userCollections);
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

// const postUserCollectionPalette = async (req, res) => {
//     if (!req.headers.authorization) {
//         return res.status(403).send("Please login");
//       }
//       const { collectionId } = req.params;

//       const authToken = req.headers.authorization.split(" ")[1];

//       try {
//         const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);
//         const userCollections = await knex("pivot").insert({
//           ...req.body,
//           collection_id: Number(collectionId),
//         });
//         res.status(200).json(userCollections);
//       } catch (error) {
//         console.log(error);
//       }
// };

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
  //   const { userId } = req.params;
  if (!req.headers.authorization) {
    return res.status(403).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(authToken, process.env.JWT_KEY);

    await knex("favourites").insert({ ...req.body, user_id: verifiedToken.id });

    const updatedFavourites = await knex("favourites").where({
      user_id: verifiedToken.id,
    });
    res.status(200).json(updatedFavourites);
  } catch {
    return res.send("Invalid auth token");
  }
};

module.exports = {
  index,
  signup,
  login,
  getUserInfo,
  getUserPalettes,
  postUserPalettes,
  getUserCollections,
  postUserCollections,
  //   postUserCollectionPalette,
  getUserCollectionPalettes,
  getUserFavourites,
  postUserFavourites,
};
