require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/users");
const paletteRoutes = require("./routes/palettes");
const userPalettesRoutes = require("./routes/user-palettes");
const userCollectionsRoutes = require("./routes/user-collections");
const userFavouritesRoutes = require("./routes/user-favourites");

app.use("/users", userRoutes);
app.use("/palettes", paletteRoutes);
app.use("/users/palettes", userPalettesRoutes);
app.use("/users/collections", userCollectionsRoutes);
app.use("/users/favourites", userFavouritesRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
