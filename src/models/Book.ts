import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Genre } from 'models/Genre';

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
    @Column()
    description?: string;

    @Field(() => Date)
    @Column()
    published?: Date;

    @Field(() => Date)
    @Column({ default: new Date() })
    lastModified: Date;

    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'bookGenres',
        joinColumn: { name: 'genreId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'bookId', referencedColumnName: 'id' },
    })
    genres: Genre[];
}
