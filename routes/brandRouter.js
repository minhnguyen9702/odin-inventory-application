const { Router } = require("express");
const categoryController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get('/', categoryController.getBrands)

module.exports = brandRouter;