const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
  db: pool,
  connect,
  createNewDatabase,
};

async function connect() {
  return await pool.connect();
}

async function createNewDatabase() {
  const query = {
    text: `
      DROP TABLE IF EXISTS note;
      DROP TABLE IF EXISTS label;
      DROP TABLE IF EXISTS image;

      DROP TYPE IF EXISTS NOTE_CATEGORY;
      CREATE TYPE NOTE_CATEGORY AS ENUM ('default', 'pinned', 'archived');
      
      CREATE TABLE note (
        id serial PRIMARY KEY, 
        user_id INT NOT NULL, 
        title VARCHAR(255), 
        body TEXT NOT NULL, 
        images INT[], 
        labels INT[], 
        category NOTE_CATEGORY DEFAULT 'default', 
        created TIMESTAMPTZ NOT NULL, 
        edited TIMESTAMPTZ NOT NULL
      );
      
      CREATE TABLE label (
        id serial PRIMARY KEY, 
        user_id INT NOT NULL, 
        name VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE image (
        id serial PRIMARY KEY, 
        user_id INT NOT NULL, 
        note_id INT NOT NULL, 
        data bytea NOT NULL
      );
    `,
  };

  return await pool.query(query);
}
