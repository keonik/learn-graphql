CREATE TABLE libraries (
    id              serial PRIMARY KEY,
    name            varchar(500),
    description     varchar(1000),
    last_modified   timestamp with time zone
);

INSERT INTO libraries
    (name,description)
VALUES
    ('My Library','Collection of literary classics.');

CREATE TABLE Books (
    id              serial PRIMARY KEY,
    title           varchar(500),
    author          varchar(500),
    description     varchar(1000),
    published       timestamp with time zone,
    last_modified   timestamp with time zone
);

INSERT INTO Books
    (title,author,description,published)
VALUES
    ('Pride and Prejudice','Jane Austen','','1813-01-01T00:00:00Z'),
    ('To Kill a Mockingbird','Harper Lee','','1960-01-01T00:00:00Z'),
    ('The Great Gatsby','F. Scott Fitzgerald','','1926-01-01T00:00:00Z'),
    ('1984','George Orwell','','1949-01-01T00:00:00Z'),
    ('The Catcher in the Rye','J.D. Salinger','','1951-01-01T00:00:00Z'),
    ('Lord of the Flies','William Golding','','1954-01-01T00:00:00Z'),
    ('Fahrenheit 451','Ray Bradbury','','1953-01-01T00:00:00Z'),
    ('Of Mice and Men','John Steinbeck','','1937-01-01T00:00:00Z'),
    ('A Tale of Two Cities','Charles Dickens','','1859-01-01T00:00:00Z'),
    ('The Count of Monte Cristo','Alexandre Dumas','','1844-01-01T00:00:00Z');

CREATE TABLE Genres (
    id              serial PRIMARY KEY,
    genre           varchar(250),
    last_modified   timestamp with time zone
);

INSERT INTO Genres
    (genre)
VALUES
    ('Classic'),
    ('Fantasy'),
    ('Science Fiction'),
    ('Western'),
    ('Romance'),
    ('Thriller'),
    ('Mystery'),
    ('Dystopia'),
    ('Historical Fiction'),
    ('Crime'),
    ('Tragedy'),
    ('Realistic Fiction'),
    ('Allegory');

CREATE TABLE books_libraries (
    id              serial PRIMARY KEY,
    book_id         int REFERENCES books(id),
    library_id      int REFERENCES libraries(id)
);

INSERT INTO books_libraries
    (book_id,library_id)
VALUES
    (1,1),
    (2,1),
    (3,1),
    (4,1),
    (5,1),
    (6,1),
    (7,1),
    (8,1),
    (9,1),
    (10,1);

CREATE TABLE BooksGenres (
    id              serial PRIMARY KEY,
    genre_id        int REFERENCES genres(id),
    book_id         int REFERENCES books(id)
);

INSERT INTO BooksGenres
    (genre_id,book_id)
VALUES
    (1,1),
    (5,1),
    (1,2),
    (10,2),
    (1,3),
    (11,3),
    (1,4),
    (8,4),
    (1,5),
    (12,5),
    (1,6),
    (13,6),
    (1,7),
    (8,7),
    (1,8),
    (11,8),
    (1,9),
    (9,9),
    (1,10),
    (9,10);