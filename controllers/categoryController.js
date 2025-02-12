const db = require("../db/queries.js");

exports.getCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.render("category", { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching categories");
  }
};