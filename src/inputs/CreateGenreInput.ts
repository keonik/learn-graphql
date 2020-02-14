import { InputType, Field } from 'type-graphql';
import { Book } from 'models/Book';

@InputType()
export class CreateGenreInput {
    @Field()
    genre: string;

    @Field({ defaultValue: new Date().toISOString() })
    last_modified: Date;

    books?: [Book];
}
