import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { BookResolver } from 'resolvers/BookResolver';
import { GenreResolver } from 'resolvers/GenreResolver';

export const PORT = 9000;
export const path = '/api';

async function serve(): Promise<void> {
    await createConnection();

    const app = express();

    const schema = await buildSchema({ resolvers: [BookResolver, GenreResolver] });

    const server = new ApolloServer({ schema });
    server.applyMiddleware({ app, path });

    app.listen({ port: PORT, host: '0.0.0.0' }, () =>
        console.log(`🚀 Server ready at http://0.0.0.0:${PORT}${server.graphqlPath}`)
    );
}

serve();
