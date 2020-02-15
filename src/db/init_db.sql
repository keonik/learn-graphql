CREATE TABLE libraries (
    id              serial PRIMARY KEY,
    name            varchar(500),
    description     varchar(1000),
    "lastModified"   timestamp with time zone
);

INSERT INTO libraries
    (name,description)
VALUES
    ('My Library','Collection of literary classics.');

CREATE TABLE books
(
    id serial,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    author character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    published timestamp without time zone NOT NULL,
    "lastModified" timestamp without time zone NOT NULL DEFAULT '2020-02-15 05:08:15.915'::timestamp without time zone,
    CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY (id)
);

INSERT INTO books
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


CREATE TABLE genres
(
    id serial,
    genre character varying COLLATE pg_catalog."default" NOT NULL,
    "lastModified" timestamp without time zone DEFAULT '2020-02-15 05:08:15.914'::timestamp without time zone,
    CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY (id)
);

INSERT INTO genres
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

CREATE TABLE "booksLibraries" (
    id              serial PRIMARY KEY,
    "bookId"         int REFERENCES books(id),
    "libraryId"      int REFERENCES libraries(id)
);

INSERT INTO "booksLibraries"
    ("bookId","libraryId")
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


CREATE TABLE "bookGenres"
(
    "bookId" integer NOT NULL,
    "genreId" integer NOT NULL,
    CONSTRAINT "PK_8415631105f18e3b80434072ae7" PRIMARY KEY ("bookId", "genreId"),
    CONSTRAINT "FK_779818e2ed20f48505200fdcf06" FOREIGN KEY ("genreId")
        REFERENCES public.genres (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_79eb294e17b3b511d2d3bf8d896" FOREIGN KEY ("bookId")
        REFERENCES public.books (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO "bookGenres"
    ("genreId","bookId")
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