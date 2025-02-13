const { Router } = require("express");
const itemController = require("../controllers/itemController.js");
const itemRouter = Router();

itemRouter.get("/", itemController.getIndex);
itemRouter.get("/items", itemController.getItems);
itemRouter.get("/item/new", itemController.getCreateItem);
itemRouter.post("/items/create", itemController.createNewItem);
itemRouter.post("/items/delete", itemController.removeItem);

module.exports = itemRouter;