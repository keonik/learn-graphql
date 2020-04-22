import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Book } from '../models';

define(Book, (faker: typeof Faker, settings: {} | undefined) => {
    let SeedBook = new Book();
    SeedBook.title = Faker.commerce.product();
    SeedBook.author = Faker.name.firstName() + ' ' + Faker.name.lastName();
    SeedBook.description = Faker.lorem.sentences(3);
    SeedBook.published = Faker.date.recent(365);
    return SeedBook;
});
