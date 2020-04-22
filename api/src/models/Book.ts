import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, UpdateDateColumn } from 'typeorm';
import { ObjectType, ID, Field } from 'type-graphql';
import { Genre } from './Genre';

@Entity({ name: 'book' })
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
    @Column({ default: '' })
    description: string;

    @Field(() => Date)
    @Column({ default: new Date().toISOString() })
    published: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    lastModified: Date;

    @Field(() => [Genre])
    @ManyToMany((type) => Genre, (Genre) => Genre.books)
    genres!: Genre[];
}
