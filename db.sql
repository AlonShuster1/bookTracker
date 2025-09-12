CREATE TABLE if NOT EXISTS books(
	id SERIAL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
    details VARCHAR(200),
    rating smallint
);
INSERT INTO books (title, details, rating)
VALUES ('harry potter', 'an excellent book', 10), 
		('a Tale Of Two Cities', 'very good book', 8)
ON CONFLICT (title) DO NOTHING;