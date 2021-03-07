const { Pool } = require("pg");
const process = require("process");

/*
By default node-postgres uses the following environment variables to
configure a connection.

{
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE, 
  password: process.env.PGPASSWORD, 
  port: process.env.PGPORT
}
*/
let client = new Pool();

module.exports = {
  db: client,
  connect,
  createNewDatabase,
};

async function connect() {
  console.log(
    `connecting to database '${process.env.PGDATABASE}' at ${process.env.PGHOST}:${process.env.PGPORT} with user '${process.env.PGUSER}'`
  );
  return await client.connect();
}

async function createNewDatabase() {
  const query = {
    text: `
      DROP TABLE IF EXISTS image;
      DROP TABLE IF EXISTS note_label;
      DROP TABLE IF EXISTS note;
      DROP TABLE IF EXISTS label;
      DROP TABLE IF EXISTS app_user;
      
      DROP TYPE IF EXISTS NOTE_CATEGORY;
      CREATE TYPE NOTE_CATEGORY AS ENUM ('default', 'pinned', 'archived');

      DROP TYPE IF EXISTS AUTH_PROVIDER;
      CREATE TYPE AUTH_PROVIDER AS ENUM ('google');

      CREATE TABLE app_user (
        id VARCHAR(128) PRIMARY KEY, 
        auth_provider AUTH_PROVIDER NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        name VARCHAR(255), 
        created TIMESTAMPTZ NOT NULL
      );
      
      CREATE TABLE label (
        id VARCHAR(128) NOT NULL, 
        user_id VARCHAR(128) NOT NULL, 
        name VARCHAR(255) NOT NULL, 
      
        PRIMARY KEY(id, user_id), 
      
        CONSTRAINT fk_user_id
          FOREIGN KEY(user_id)
            REFERENCES app_user(id)
              ON DELETE CASCADE, 
      
        UNIQUE(user_id, name)
      );
      
      CREATE TABLE note (
        id VARCHAR(128) NOT NULL, 
        user_id VARCHAR(128) NOT NULL, 
        title VARCHAR(255), 
        body TEXT, 
        category NOTE_CATEGORY DEFAULT 'default', 
        created TIMESTAMPTZ NOT NULL, 
        edited TIMESTAMPTZ NOT NULL, 
      
        PRIMARY KEY(id, user_id), 
      
        CONSTRAINT fk_user_id
          FOREIGN KEY(user_id)
            REFERENCES app_user(id)
              ON DELETE CASCADE, 
        
        UNIQUE(user_id, id)
      );
      
      CREATE TABLE note_label (
        user_id VARCHAR(128) NOT NULL, 
        note_id VARCHAR(128) NOT NULL, 
        label_id VARCHAR(128) NOT NULL, 

        CONSTRAINT fk_user_id
          FOREIGN KEY(user_id)
            REFERENCES app_user(id)
              ON DELETE CASCADE, 
      
        CONSTRAINT fk_note_id
          FOREIGN KEY(note_id, user_id)
            REFERENCES note(id, user_id)
              ON DELETE CASCADE, 
      
        CONSTRAINT fk_label_id
          FOREIGN KEY(label_id, user_id)
            REFERENCES label(id, user_id)
              ON DELETE CASCADE, 
        
        UNIQUE(user_id, note_id, label_id)
      );
      
      CREATE TABLE image (
        id serial PRIMARY KEY, 
        data bytea NOT NULL
      );
    `,
  };

  return await client.query(query);
}
