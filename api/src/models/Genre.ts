import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from './Book';

@Entity({ name: 'genre' })
@ObjectType()
export class Genre extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Date)
    @UpdateDateColumn()
    lastModified: Date;

    @Field(() => [Book])
    @ManyToMany((type) => Book, (Book) => Book.genres)
    @JoinTable()
    books!: Book[];
}
