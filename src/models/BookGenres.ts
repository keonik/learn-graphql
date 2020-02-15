import { Entity, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Field, ID } from 'type-graphql';
import { Book } from './Book';
import { Genre } from './Genre';

@Entity({ name: 'bookGenres' })
export class BookGenres extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    bookId: string;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
    book: Book;

    @Field(() => ID)
    @PrimaryColumn()
    genreId: string;

    @ManyToOne(() => Genre)
    @JoinColumn({ name: 'genreId', referencedColumnName: 'id' })
    genre: Genre;
}
