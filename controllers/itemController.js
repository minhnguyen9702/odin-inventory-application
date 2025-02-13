const db = require("../db/queries.js");

exports.getIndex = async (req, res) => {
  res.render("index");
};

exports.getItems = async (req, res) => {
  try {
    const items = await db.fetchAllItems();
    res.render("items", { items });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching items");
  }
};

exports.getItemCloseup = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db.fetchItemById(id);
    res.render('itemCloseup', { item });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.getCreateItem = async (req, res) => {
  try {
    const brands = await db.fetchAllBrands();
    const categories = await db.fetchAllCategories();
    res.render("createItem", {
      brands,
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.createNewItem = async (req, res) => {
  try {
    const { name, brand_id, category_id, year, description, image_url } =
      req.body;

    if (year % 10 !== 0) {
      return res.status(400).send("Year must be a multiple of 10.");
    }

    await db.addItem(name, brand_id, category_id, year, description, image_url);

    res.redirect("/items");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { item_id } = req.body;
    await db.deleteItem(item_id);
    res.redirect('/item');
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
