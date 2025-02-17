const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:id", categoryController.getCategoryItems);
categoryRouter.post('/create', categoryController.createCategory)
categoryRouter.post('/delete', categoryController.removeCategory)

module.exports = categoryRouter;