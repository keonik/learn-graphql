import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Book } from 'models/Book';
import { CreateBookInput } from '../inputs/CreateBookInput';
import { UpdateBookInput } from '../inputs/UpdateBookInput';
import { BookGenres } from 'models/BookGenres';

@Resolver()
export class BookResolver {
    @Query(() => Book)
    async book(@Arg('id') id: string) {
        const book = await Book.findOne({ relations: ['genres'], where: { id } });
        if (!book) throw Error('Book not found!');
        return book;
    }
    @Query(() => [Book])
    books() {
        return Book.find({ relations: ['genres'] });
    }

    @Mutation(() => Book)
    async createBook(@Arg('data') data: CreateBookInput) {
        const book = Book.create(data);
        await book.save();
        return book;
    }
    @Mutation(() => Book)
    async updateBook(@Arg('id') id: string, data: UpdateBookInput) {
        const book = await Book.findOne({ where: { id } });
        if (!book) throw new Error('Book not found!');
        Object.assign(book, data);
        await book.save();
        return book;
    }

    @Mutation(() => Boolean)
    async deleteBook(@Arg('id') id: string) {
        const book = await Book.findOne({ where: { id } });
        if (!book) throw new Error('Book not found!');
        await book.remove();
        return true;
    }
}
