const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World11233");
});

app.use("/users", userRoutes);

module.exports = app;
