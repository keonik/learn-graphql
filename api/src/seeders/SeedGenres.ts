import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Genre, Book } from '../models';

export default class SeedGenres implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.createQueryBuilder().delete().from(Book);
        await connection.createQueryBuilder().delete().from(Genre);

        let seededBooks = await factory(Book)().seedMany(3);
        await factory(Genre)({ books: seededBooks }).seedMany(10);
    }
}
