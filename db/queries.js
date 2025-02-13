const pool = require("./pool");

const fetchAllItems = async () => {
  const query = `SELECT * FROM items;`;
  const { rows } = await pool.query(query);
  return rows;
}

const fetchAllCategories = async () => {
  const query = 'SELECT * FROM categories;';
  const { rows } = await pool.query(query);
  return rows
}

const fetchCategoryItems = async (categoryId) => {
  const query = "SELECT * FROM items WHERE category_id = $1;";
  const { rows } = await pool.query(query, [categoryId]);
  return rows;
};

const fetchCategoryById = async (categoryId) => {
  const query = "SELECT * FROM categories WHERE id = $1;"
  const { rows } = await pool.query(query, [categoryId]);
  return rows[0]
}

const fetchAllBrands = async () => {
  const query = 'SELECT * FROM brands;';
  const { rows } = await pool.query(query);
  return rows
}

const fetchBrandItems = async (brandId) => {
  const query = "SELECT * FROM items WHERE brand_id = $1;";
  const { rows } = await pool.query(query, [brandId]);
  return rows;
};

const fetchBrandById = async (brandId) => {
  const query = "SELECT * FROM brands WHERE id = $1;"
  const { rows } = await pool.query(query, [brandId]);
  return rows[0]
}

module.exports = {
  fetchAllItems,
  fetchAllCategories,
  fetchCategoryItems,
  fetchCategoryById,
  fetchAllBrands,
  fetchBrandItems,
  fetchBrandById,
};