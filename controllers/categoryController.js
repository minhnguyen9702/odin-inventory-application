const db = require("../db/queries.js");

exports.getCategories = async (req, res) => {
  try {
    const categories = await db.fetchAllCategories();
    res.render("category", { categories: categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching categories");
  }
};

exports.getCategoryItems = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const items = await db.fetchCategoryItems(categoryId);

    const category = await db.fetchCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("categoryItems", {
      category: category,
      items: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
