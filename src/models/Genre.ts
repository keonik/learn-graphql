import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID, Ctx } from 'type-graphql';
import { Book } from 'models/Book';
import { GraphQLContext } from './GraphQLContext';

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
    // @Field(_ => [Book], { nullable: false })
    // async movies(@Ctx() ctx: GraphQLContext): Promise<ReadonlyArray<Book>> {
    //     return await ctx.loaders.load(this.id);
    // }
}
