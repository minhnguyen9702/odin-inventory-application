require('dotenv').config()

const express = require("express");
const app = express();
const path = require("node:path");
const itemRouter = require("./routes/itemRouter");
const brandRouter = require("./routes/brandRouter");
const categoryRouter = require("./routes/categoryRouter")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", itemRouter);
app.use("/", brandRouter);
app.use("/category", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});