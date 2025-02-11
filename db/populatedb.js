require("dotenv").config();
const { Client } = require("pg");

const dbUrl =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- e.g., "1950s Hercules Denim Jacket"
    brand_id INT,
    category_id INT,
    year INT, -- Estimated production year
    description TEXT,
    image_url TEXT,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
`;

const insertCategories = `
INSERT INTO categories (name) 
VALUES 
  ('Denim Jacket'),
  ('T-Shirt'),
  ('Sweater');
`;

const insertBrands = `
INSERT INTO brands (name) 
VALUES 
  ('Hercules'),
  ('Levi\'s'),
  ('Wrangler');
`;

const insertItems = `
INSERT INTO items (name, brand_id, category_id, year, description, image_url) 
VALUES 
  ('1950s Hercules Denim Jacket', 1, 1, 1950, 'A vintage 1950s denim jacket by Hercules.', 'http://example.com/image1.jpg'),
  ('Levi\'s T-Shirt', 2, 2, 1980, 'A classic 1980s Levi\'s T-shirt.', 'http://example.com/image2.jpg');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: dbUrl,
  });

  try {
    await client.connect();
    await client.query(SQL); // Create tables if they don't exist

    const result = await client.query("SELECT COUNT(*) FROM items"); // Check if the items table has any rows
    const count = parseInt(result.rows[0].count, 10); // Ensure count is an integer

    if (count === 0) {
      console.log("Inserting default values...");
      await client.query(insertCategories); // Insert default categories
      await client.query(insertBrands); // Insert default brands
      await client.query(insertItems); // Insert default items
    } else {
      console.log("Table already contains data. Skipping insertion.");
    }
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await client.end();
    console.log("done");
    process.exit(0);
  }
}

main();
