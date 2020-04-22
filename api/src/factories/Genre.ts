import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Genre, Book } from '../models';

define(Genre, (faker: typeof Faker, settings: { books: Book[] } | undefined) => {
    let SeedGenre = new Genre();
    SeedGenre.name = Faker.commerce.department();
    if (settings) {
        SeedGenre.books = settings.books;
    }
    return SeedGenre;
});
