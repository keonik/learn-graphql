import { genreLoader } from 'loaders/GenreLoader';

export type GraphQLContext = {
    loaders: { genreLoader: ReturnType<typeof genreLoader> };
};
