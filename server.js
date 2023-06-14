require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/users");

// Routes
app.use("/users", userRoutes);



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});