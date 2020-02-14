import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from 'models/Book';

@Entity({ name: 'Genres' })
@ObjectType()
export class Genre extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column()
    genre: string;

    @Field(() => Date)
    @Column({ default: new Date().toISOString() })
    last_modified: Date;

    @ManyToMany(() => Book)
    @JoinTable({
        name: 'BookGenres',
        joinColumn: { name: 'bookId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'genreId', referencedColumnName: 'id' },
    })
    books: Book[];
}
