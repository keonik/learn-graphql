import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, ID, Field } from 'type-graphql';
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
    @Column({ nullable: true, default: '' })
    description?: string;

    @Field(() => Date)
    @Column({ default: new Date().toISOString() })
    published?: Date;

    @Field(() => Date)
    @Column({ default: new Date() })
    lastModified: Date;

    @Field(_ => [Genre], { nullable: false })
    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'bookGenres',
        joinColumn: { name: 'genreId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'bookId', referencedColumnName: 'id' },
    })
    genres: Genre[];
}
