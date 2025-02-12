const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:id", categoryController.getCategoryItems);

module.exports = categoryRouter;