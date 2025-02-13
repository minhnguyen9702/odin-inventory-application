const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get('/', brandController.getBrands)
brandRouter.get('/:id', brandController.getBrandItems)
brandRouter.post('/create', brandController.createBrand)
brandRouter.post('/delete', brandController.removeBrand)

module.exports = brandRouter;