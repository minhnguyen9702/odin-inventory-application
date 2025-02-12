const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/category", categoryController.getCategories);

module.exports = categoryRouter;