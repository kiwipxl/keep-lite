\set ON_ERROR_STOP true

DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS note_label;
DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS label;
DROP TABLE IF EXISTS account;

DROP TYPE IF EXISTS NOTE_CATEGORY;
CREATE TYPE NOTE_CATEGORY AS ENUM ('default', 'pinned', 'archived');

CREATE TABLE account (
	id serial PRIMARY KEY
);

CREATE TABLE label (
	id serial, 
	account_id INT, 
	name VARCHAR(255) NOT NULL, 

	PRIMARY KEY(id, account_id), 

	CONSTRAINT fk_account_id
	  FOREIGN KEY(account_id)
	    REFERENCES account(id)
	      ON DELETE CASCADE, 

	UNIQUE(account_id, name)
);

CREATE TABLE note (
	id serial, 
	account_id INT, 
	title VARCHAR(255), 
	body TEXT, 
	category NOTE_CATEGORY DEFAULT 'default', 
	created TIMESTAMPTZ NOT NULL, 
	edited TIMESTAMPTZ NOT NULL, 

	PRIMARY KEY(id, account_id), 

	CONSTRAINT fk_account_id
	  FOREIGN KEY(account_id)
	    REFERENCES account(id)
	      ON DELETE CASCADE
);

CREATE TABLE note_label (
	account_id INT, 
	note_id INT, 
	label_id INT, 

	CONSTRAINT fk_note_id
	  FOREIGN KEY(note_id, account_id)
	    REFERENCES note(id, account_id)
	      ON DELETE CASCADE, 

	CONSTRAINT fk_label_id
	  FOREIGN KEY(label_id, account_id)
	    REFERENCES label(id, account_id)
	      ON DELETE CASCADE
);

CREATE TABLE image (
	id serial PRIMARY KEY, 
	data bytea NOT NULL
);

INSERT INTO account DEFAULT VALUES;

/*
INSERT INTO label(account_id, name) VALUES(1, 'daily');
INSERT INTO label(account_id, name) VALUES(1, 'meditation');
INSERT INTO note(account_id, body, created, edited) VALUES(1, 'daily note', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO note(account_id, body, created, edited) VALUES(1, 'meditation note', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO note_label(account_id, note_id, label_id) VALUES(1, 1, 1);
INSERT INTO note_label(account_id, note_id, label_id) VALUES(1, 1, 2);
INSERT INTO note_label(account_id, note_id, label_id) VALUES(1, 2, 1);

INSERT INTO account DEFAULT VALUES;
INSERT INTO label(account_id, name) VALUES(2, 'daily');
INSERT INTO label(account_id, name) VALUES(2, 'meditation');
INSERT INTO note(account_id, body, created, edited) VALUES(2, 'daily note', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO note(account_id, body, created, edited) VALUES(2, 'meditation note', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO note_label(account_id, note_id, label_id) VALUES(2, 3, 3);
INSERT INTO note_label(account_id, note_id, label_id) VALUES(2, 3, 4);
INSERT INTO note_label(account_id, note_id, label_id) VALUES(2, 4, 3);

DELETE FROM note WHERE id = 1;
DELETE FROM label WHERE id = 3;
*/