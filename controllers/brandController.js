const db = require("../db/queries.js");

exports.getBrands = async (req, res) => {
  try {
    const brands = await db.fetchAllBrands();
    res.render("brand", { brands: brands });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching brands");
  }
};

exports.getBrandItems = async (req, res) => {
  const brandId = req.params.id;
  try {
    const items = await db.fetchBrandItems(brandId);

    const brand = await db.fetchBrandById(brandId);

    if (!brand) {
      return res.status(404).send("Brand not found");
    }

    res.render("brandItems", {
      brand: brand,
      items: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    await db.addBrand(name);
    res.redirect("/brand")
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
