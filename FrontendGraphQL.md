# GraphQL using Apollo in a React app

In this project start with branch `page-routing-only` if you'd like to follow along

We already have the necessary packages installed.

-   @apollo/react-hooks
-   apollo-boost
-   graphql

1. Ensure you're in the `ui` directory

2. Ensure docker container is running and database is seeded by opening [GraphQL Playground](http://localhost:9000/graphql) and testing a query like so

```
query {
    books {
        id
        title
        author
        genres {
            id
            name
        }
    }
}
```

3. Open your [client app](http://localhost:3000)

4. Understanding folder structure

-   src
    -   pages
    -   typings
    -   App.tsx

Comes with pages genres, books, book, genre

What we are going to build are the pages for Genres and Books

5.  First we need to open `App.tsx`, import `ApolloClient` and `ApolloProvider`, and create a client

```tsx
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql'
})
```

6. Create Provider to use queries and mutations throughout the app

```tsx
function App() {
    const { pathname } = useLocation()

    return (
        <ApolloProvider client={client}>
            <div className="App">...</div>
        </ApolloProvider>
    )
}
```

You now have access to the [apollo client developer tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)!

which you can use to reference queries and caching data in the future

## Query Time!

7. Open `pages/Genres.tsx`

8. Import the following

```tsx
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
```

9. Create your query in the playground

```
    query {
        genres {
            id
            name
            books {
                id
            }
        }
    }
```

Test it to ensure it gets the data you want for you page

10. Copy it into a variable and wrap it in the gql backtick syntax

```ts
const QUERY_GENRES = gql`
    query {
        genres {
            id
            name
            books {
                id
            }
        }
    }
`
```

11. Now in your Genre function where you're returning a react component use the `useQuery` apollo hook to fetch your query

```tsx
export default function Genres({}: Props): ReactElement {
    const { data, loading, error } = useQuery(QUERY_GENRES)

    return <div></div>
}
```

On the right I destructured data, loading, error

Think of this as a promise where you do something with your api result(data), catch errors (error), and you also get access to the status of the completion of that promise(loading)

12. Add in handling of the loading and errors states in your return react node

```tsx
<div>
    {loading && <h2>Loading genres....</h2>}
    {error && <h2>Error finding genres...{error.message}</h2>}
</div>
```

13. Handle your data received on success next

```tsx
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
```

When you're done your `Genres.tsx` should look like this

```tsx
import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const QUERY_GENRES = gql`
    query {
        genres {
            id
            name
            books {
                id
            }
        }
    }
`

interface Props {}

export default function Genres({}: Props): ReactElement {
    const { data, loading, error } = useQuery(QUERY_GENRES)

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
    )
}
```

But wait it's not type safe!?!?!?

Easy...

14. Name your query to generate a type

so that this

```tsx
const QUERY_GENRES = gql`
    query {
        genres {
            id
            name
            books {
                id
            }
        }
    }
`
```

becomes this

```tsx
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
`
```

15. Run `npm run generate-types` in the `ui` folder in terminal

Now under your `typings` folder you should see a file `_graphql.tsx` which contains all the types the apollo code generation has inferred under `src/`

16. Plug those into your query like so. Your type name is based on the name you specified above `genresBookId`

```tsx
import { GenresBookId } from '../typings/_graphql';

...
    const { data, loading, error } = useQuery<GenresBookId>(QUERY_GENRES);

```

Now you should have typesafe completion for your query! Woohoo!

## Mutation Time!

1. `git checkout book-mutations`

2. Open `pages/Books.tsx`

3. View example create mutation
    - Notice refetch queries compared to how you'd typically manage the data in REST. This refetch is the same as updating the data yourself
    - If you were to be updating an existing Book you wouldn't need to do this manually. You would just ensure the id of the book you updated is returned
