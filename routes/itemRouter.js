const { Router } = require("express");
const itemController = require("../controllers/itemController.js");
const itemRouter = Router();

itemRouter.get("/", itemController.getIndex);
itemRouter.get("/items", itemController.getItems);
itemRouter.get("/item/new", itemController.getCreateItem);
itemRouter.post("/item/create", itemController.createNewItem);
itemRouter.post("/item/delete", itemController.removeItem);
itemRouter.get("/item/search", itemController.findItems);
itemRouter.get("/item/:id", itemController.getItemCloseup);

module.exports = itemRouter;