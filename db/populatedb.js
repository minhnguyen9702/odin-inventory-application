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
    name VARCHAR(255) UNIQUE NOT NULL, 
    brand_id INT,
    category_id INT,
    year INT, 
    description TEXT,
    image_url TEXT,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
`;

const insertCategories = `
INSERT INTO categories (name) 
VALUES 
  ('Outers'),
  ('Tees'),
  ('Sweaters')
ON CONFLICT (name) DO NOTHING;
`;

const insertBrands = `
INSERT INTO brands (name) 
VALUES 
  ('Hercules'),
  ('Wrangler'),
  ('Montgomery Ward')
ON CONFLICT (name) DO NOTHING;
`;

const insertItems = `
INSERT INTO items (name, brand_id, category_id, year, description, image_url) 
VALUES 
  ('1950s Hercules Denim Jacket', 1, 1, 1950, 'A vintage 1950s denim jacket by Hercules.', 'http://example.com/image1.jpg')
ON CONFLICT (name) DO NOTHING;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: dbUrl,
  });

  try {
    await client.connect();
    await client.query(SQL); // Create tables if they don't exist

    
    console.log("Inserting default categories...");
    await client.query(insertCategories);

    console.log("Inserting default brands...");
    await client.query(insertBrands);

    console.log("Inserting default items...");
    await client.query(insertItems);
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await client.end();
    console.log("done");
    process.exit(0);
  }
}

main();
