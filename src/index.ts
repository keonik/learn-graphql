import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { BookResolver } from 'resolvers/BookResolver';
import { GenreResolver } from 'resolvers/GenreResolver';

const port = 9000;

async function serve() {
    await createConnection();
    const schema = await buildSchema({ resolvers: [BookResolver, GenreResolver] });
    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });
    await server.listen(port);
    console.log(`Server running on port ${port}. http://localhost:${port}`);
}

serve();
