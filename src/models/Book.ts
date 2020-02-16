import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, In } from 'typeorm';
import { ObjectType, ID, Ctx, Field } from 'type-graphql';
import { Genre } from 'models/Genre';
import { BookGenres } from './BookGenres';

@Entity({ name: 'books' })
@ObjectType()
export class Book extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String)
    @Column()
    author: string;

    @Field(() => String)
    @Column({ nullable: true, default: '' })
    description?: string;

    @Field(() => Date)
    @Column({ default: new Date().toISOString() })
    published?: Date;

    @Field(() => Date)
    @Column({ default: new Date() })
    lastModified: Date;

    @Field(() => Genre)
    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'bookGenres',
        joinColumn: { name: 'genreId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'bookId', referencedColumnName: 'id' },
    })
    genres: Genre[];

    // @Field(_ => [Genre], { nullable: false })
    // async genres(@Ctx() ctx: any): Promise<ReadonlyArray<Genre>> {
    //     return (async () => {
    //         const bookGenres: BookGenres[] = await BookGenres.find({
    //             relations: ['genre'],
    //             where: { genreId: In(this.id) },
    //         });
    //         return await Promise.all(
    //             bookIds.map(bookId =>
    //                 bookGenres.filter(bookGenre => bookGenre.bookId === bookId).map(bookGenre => bookGenre.genre)
    //             )
    //         );
    //     }).map(genre => new Genre(genre));
    // }
}
