import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { GenresBookId } from '../typings/_graphql';

const QUERY_GENRES = gql`
    query genresBookId {
        genres {
            id
            name
            books {
                id
            }
        }
    }
`;

const UPDATE_GENRE = gql``;

interface Props {}

export default function Genres({}: Props): ReactElement {
    const { data, loading, error } = useQuery<GenresBookId>(QUERY_GENRES);

    return (
        <div>
            {loading && <h2>Loading genres....</h2>}
            {error && <h2>Error finding genres...{error.message}</h2>}
            <ol>
                {data?.genres.map((genre: any) => (
                    <li key={genre.id}>
                        <p>Name: {genre.name}</p>
                        <p>Book Count: {genre.books.length}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
