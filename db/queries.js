const pool = require("./pool");

const fetchAllItems = async () => {
  const query = `SELECT * FROM items;`;
  const { rows } = await pool.query(query);
  return rows;
};

const fetchItemById = async (itemId) => {
  console.log(`Fetching item with ID: ${itemId}`);
  const query = `
    SELECT items.*, brands.name AS brand_name, categories.name AS category_name
    FROM items
    LEFT JOIN brands ON items.brand_id = brands.id
    LEFT JOIN categories ON items.category_id = categories.id
    WHERE items.id = $1;
  `;
  const { rows } = await pool.query(query, [itemId]);
  return rows[0]; // Return the first (and only) row
};

const fetchAllCategories = async () => {
  const query = "SELECT * FROM categories;";
  const { rows } = await pool.query(query);
  return rows;
};

const fetchCategoryItems = async (categoryId) => {
  const query = "SELECT * FROM items WHERE category_id = $1;";
  const { rows } = await pool.query(query, [categoryId]);
  return rows;
};

const fetchCategoryById = async (categoryId) => {
  const query = "SELECT * FROM categories WHERE id = $1;";
  const { rows } = await pool.query(query, [categoryId]);
  return rows[0];
};

const fetchAllBrands = async () => {
  const query = "SELECT * FROM brands;";
  const { rows } = await pool.query(query);
  return rows;
};

const fetchBrandItems = async (brandId) => {
  const query = "SELECT * FROM items WHERE brand_id = $1;";
  const { rows } = await pool.query(query, [brandId]);
  return rows;
};

const fetchBrandById = async (brandId) => {
  const query = "SELECT * FROM brands WHERE id = $1;";
  const { rows } = await pool.query(query, [brandId]);
  return rows[0];
};

const addItem = async (
  name,
  brand_id,
  category_id,
  year,
  description,
  image_url
) => {
  const query = `
    INSERT INTO items (name, brand_id, category_id, year, description, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;

  const values = [name, brand_id, category_id, year, description, image_url];

  try {
    const result = await pool.query(query, values);
    return result.rows[0].id; // Return the inserted item's ID
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add item to database");
  }
};

const deleteItem = async (item_id) => {
  const query = `
    DELETE FROM items
    WHERE id = $1
    RETURNING id;
  `;

  const values = [item_id];

  try {
    const result = await pool.query(query, values);

    // If no item was deleted, result.rows will be empty
    if (result.rows.length === 0) {
      throw new Error("Item not found");
    }
    return result.rows[0].id; // Return the deleted item's ID
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete item from database");
  }
};

const addBrand = async (brandName) => {
  const query = `INSERT INTO brands (name) VALUES ($1)
  ON CONFLICT (name) DO NOTHING;`;

  try {
    await pool.query(query, [brandName]);
    console.log("Brand added successfully");
  } catch (error) {
    console.error("Error adding brand:", error);
  }
};

const deleteBrand = async (brandId) => {
  const deleteItemsQuery = `
  DELETE FROM items
  WHERE brand_id = $1
  RETURNING id;`;

  const deleteBrandQuery = `
  DELETE FROM brands
  WHERE id = $1
  RETURNING id;`;

  try {
    await pool.query(deleteItemsQuery, [brandId])
    await pool.query(deleteBrandQuery, [brandId]);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete brand and associated items");
  }
};

const addCategory = async (categoryName) => {
  const query = `INSERT INTO categories (name) VALUES ($1)
  ON CONFLICT (name) DO NOTHING;`;

  try {
    await pool.query(query, [categoryName]);
    console.log("Category added successfully");
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

const deleteCategory = async (categoryId) => {
  const deleteItemsQuery = `
  DELETE FROM items
  WHERE category_id = $1
  RETURNING id;`;

  const deleteCategoryQuery = `
  DELETE FROM categories
  WHERE id = $1
  RETURNING id;`;

  try {
    await pool.query(deleteItemsQuery, [categoryId])
    await pool.query(deleteCategoryQuery, [categoryId]);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete category and associated items");
  }
};


module.exports = {
  fetchAllItems,
  fetchItemById,
  fetchAllCategories,
  fetchCategoryItems,
  fetchCategoryById,
  fetchAllBrands,
  fetchBrandItems,
  fetchBrandById,
  addItem,
  deleteItem,
  addBrand,
  deleteBrand,
  addCategory,
  deleteCategory,
};
