import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Genre } from 'models/Genre';

@Entity({ name: 'Books' })
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
    last_modified: Date;

    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'BookGenres',
        joinColumn: { name: 'genreId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'bookId', referencedColumnName: 'id' },
    })
    genres: Genre[];
}
