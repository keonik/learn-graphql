import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateGenreInput {
    @Field({ nullable: true })
    name?: string;
}
