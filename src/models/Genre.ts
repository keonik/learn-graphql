import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from 'models/Book';

@Entity({ name: 'genres' })
@ObjectType()
export class Genre extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Date)
    @Column({ default: new Date().toISOString(), nullable: true })
    lastModified?: Date;

    @Field(() => Book)
    @ManyToMany(() => Book)
    @JoinTable({
        name: 'bookGenres',
        joinColumn: { name: 'bookId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'genreId', referencedColumnName: 'id' },
    })
    books: Book[];
}
