import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { BookResolver } from 'resolvers/BookResolver';
import { GenreResolver } from 'resolvers/GenreResolver';

async function main() {
    const connection = await createConnection();
    const schema = await buildSchema({ resolvers: [BookResolver, GenreResolver] });
    const server = new ApolloServer({ schema });
    await server.listen(9000);
    console.log('Server has started!');
}

main();
