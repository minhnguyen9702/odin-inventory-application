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

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await db.addCategory(name);
    res.redirect("/category")
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const { category_id } = req.body;
    await db.deleteCategory(category_id);
    res.redirect('/category');
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};