const pool = require("./pool");

getAllItems = async () => {
  const query = `SELECT * FROM items;`;
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllItems,
};