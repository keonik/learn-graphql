import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateGenreInput {
    @Field({ nullable: true })
    genre?: string;

    @Field({ nullable: true, defaultValue: new Date().toISOString() })
    last_modified: string;

    @Field({ nullable: true })
    isPublished?: boolean;
}
