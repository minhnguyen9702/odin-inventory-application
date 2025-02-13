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