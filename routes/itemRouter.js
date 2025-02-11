const { Router } = require("express");

const itemRouter = Router();

itemRouter.get("/", async (req, res) => {
  res.render("index");
});

module.exports = itemRouter;