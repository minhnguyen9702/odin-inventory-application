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
  ('Tees'),
  ('Shirts'),
  ('Sweatshirts'),
  ('Knitwear'),
  ('Outers'),
  ('Bottoms')  
ON CONFLICT (name) DO NOTHING;
`;

const insertBrands = `
INSERT INTO brands (name) 
VALUES 
  ('Hercules'),
  ('Wrangler'),
  ('Montgomery Ward'),
  ('Dee Cee')
ON CONFLICT (name) DO NOTHING;
`;

const insertItems = `
INSERT INTO items (name, brand_id, category_id, year, description, image_url) 
VALUES 
  ('1940s Hercules Chore Coat', 
   (SELECT id FROM brands WHERE name = 'Hercules'), 
   (SELECT id FROM categories WHERE name = 'Outers'), 
   1940, 
   'A heavyweight denim chore coat from the 1940s by Hercules.', 
   'http://example.com/image2.jpg'),

  ('1960s Wrangler Western Shirt', 
   (SELECT id FROM brands WHERE name = 'Wrangler'), 
   (SELECT id FROM categories WHERE name = 'Shirts'), 
   1965, 
   'A classic 1960s western-style denim shirt by Wrangler.', 
   'http://example.com/image3.jpg'),

  ('1950s Montgomery Ward 101 Denim Jacket', 
   (SELECT id FROM brands WHERE name = 'Montgomery Ward'), 
   (SELECT id FROM categories WHERE name = 'Outers'), 
   1955, 
   'A double pleated type-2 denim jacket from Montgomery Ward.', 
   'http://example.com/image4.jpg'),

  ('1970s Wrangler Denim Bell Bottoms', 
   (SELECT id FROM brands WHERE name = 'Wrangler'), 
   (SELECT id FROM categories WHERE name = 'Bottoms'), 
   1975, 
   'A pair of 1970s Wrangler denim bell-bottom jeans.', 
   'http://example.com/image5.jpg'),

  ('1960s Dee Cee Painter Pants', 
   (SELECT id FROM brands WHERE name = 'Dee Cee'), 
   (SELECT id FROM categories WHERE name = 'Bottoms'), 
   1960, 
   'Durable 1960s work pants by Dee Cee, perfect for laborers.', 
   'http://example.com/image6.jpg'),

  ('1950s Hercules Flannel Shirt', 
   (SELECT id FROM brands WHERE name = 'Hercules'), 
   (SELECT id FROM categories WHERE name = 'Knitwear'), 
   1952, 
   'A soft and rugged flannel shirt from Hercules.', 
   'http://example.com/image7.jpg'),

  ('1940s Montgomery Ward Wool Overcoat', 
   (SELECT id FROM brands WHERE name = 'Montgomery Ward'), 
   (SELECT id FROM categories WHERE name = 'Outers'), 
   1948, 
   'A long, heavyweight wool overcoat from Montgomery Ward.', 
   'http://example.com/image8.jpg'),

  ('1970s Wrangler Sherpa-Lined Jacket', 
   (SELECT id FROM brands WHERE name = 'Wrangler'), 
   (SELECT id FROM categories WHERE name = 'Outers'), 
   1977, 
   'A vintage denim jacket with sherpa lining from Wrangler.', 
   'http://example.com/image9.jpg'),

  ('1950s Dee Cee Denim Overalls', 
   (SELECT id FROM brands WHERE name = 'Dee Cee'), 
   (SELECT id FROM categories WHERE name = 'Bottoms'), 
   1953, 
   'Classic 1950s denim overalls by Dee Cee.', 
   'http://example.com/image10.jpg')
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
