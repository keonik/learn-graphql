import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Genre } from 'models/Genre';
import { CreateGenreInput } from 'inputs/CreateGenreInput';
import { UpdateBookInput } from 'inputs/UpdateBookInput';

@Resolver()
export class GenreResolver {
    @Query(() => Genre)
    genre(@Arg('id') id: string) {
        return Genre.findOne({ relations: ['books'], where: { id } });
    }

    @Query(() => [Genre])
    genres() {
        return Genre.find({ relations: ['books'] });
    }

    @Mutation(() => Genre)
    async createGenre(@Arg('data') data: CreateGenreInput) {
        const genre = Genre.create(data);
        await genre.save();
        return genre;
    }

    @Mutation(() => Genre)
    async updateGenre(@Arg('id') id: string, data: UpdateBookInput) {
        const genre = Genre.findOne({ where: { id } });
        if (!genre) throw new Error('Genre not found!');
        Object.assign(genre, data);
        return genre;
    }

    @Mutation(() => Boolean)
    async deleteGenre(@Arg('id') id: string) {
        const genre = await Genre.findOne({ where: { id } });
        if (!genre) throw new Error('Genre not found!');
        await genre.remove();
        return true;
    }
}
