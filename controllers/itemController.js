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
