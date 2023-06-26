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

  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).send("Please provide all user info");
  }

  const findEmail = await knex("users").where({ email: email });
  if (findEmail.length > 0) {
    return res.status(400).send("User already exists!");
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
    console.log("user", user);
    if (!user) {
      return res.status(400).send("Invalid user!");
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid password!");
    }

    const authToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).send({ authToken });
  } catch (error) {
    res.status(400).send("Incorrect username or password!");
  }
};

const getUserInfo = async (req, res) => {
  if (!req.headers.authorization) {
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

module.exports = {
  index,
  signup,
  login,
  getUserInfo,
};
