const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/", itemController.getIndex);
itemRouter.get("/items", itemController.getItems);

module.exports = itemRouter;