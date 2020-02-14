import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from './Book';
import { Genre } from './Genre';

@Entity({ name: 'BookGenres' })
export class BookGenres extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    bookId: string;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
    book: Book;

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    genreId: string;

    @ManyToOne(() => Genre)
    @JoinColumn({ name: 'genreId', referencedColumnName: 'id' })
    genre: Genre;
}
