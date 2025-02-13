const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get('/', brandController.getBrands)
brandRouter.get('/:id', brandController.getBrandItems)

module.exports = brandRouter;