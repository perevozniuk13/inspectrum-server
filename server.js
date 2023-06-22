require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const expressSession = require("express-session");

// Add http headers, small layer of security
const helmet = require("helmet");

// Passport library and Github Strategy
const passport = require("passport");
const GitHubStrategy = require("passport-google-oauth20").Strategy;

app.use(cors());
app.use(express.json());

require("dotenv").config();

// Initialize HTTP Headers middleware
app.use(helmet());

// Enable CORS (with additional config options required for cookies)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Include express-session middleware (with additional config options required for Passport session)
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const userRoutes = require("./routes/users");
const paletteRoutes = require("./routes/palettes");

// Routes
app.use("/users", userRoutes);

app.use("/palettes", paletteRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
