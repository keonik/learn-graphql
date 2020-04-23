---
title: GraphQL
revealOptions:
    transition: 'slide'
---

## Learning Graphql Part 1: DX

#### John Fay

#### Want to follow along?

`keonik.github.io/learn-graphql`

```
git clone git@github.com:keonik/learn-graphql.git

cd learn-graphql

make up

make database-init
```

Note: 1. Have docker :| 2. Open terminal 3. `git clone git@github.com:keonik/learn-graphql.git` 4. `cd learn-graphql` 5. `npm install` 6. `docker-compose up`

---

## Agenda

-   What is graphql?
-   (Pros) What does it solve?
-   (Cons) What issues does it cause?
-   How will it help Mile Two
-   How it will help your professional development
-   Demo

---

<section>
<img src="https://raw.githubusercontent.com/keonik/learn-graphql/master/assets/embarassing-author.jpeg" height="400">
    <h2>About me</h2>
    -   5 months of GraphQL exposure
    <br/>
    -   2 month head down learning
    Note: Not gonna get some expert level detail but hopefully we all leave here with some new knowledge and an increased interest to use graphql
</section>

<section data-transition="zoom">
    <h2>Learning new tech</h2>
    <img src="https://github.com/keonik/learn-graphql/blob/master/assets/JS_Learning.png?raw=true" height="400"/>
</section>

---

<section>
<div style="display: flex; justify-content: center; align-items: center;">
    <h2>What is GraphQL?</h2>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png" height="100" style="border: none; padding-left: 10px"/>
</div>

<div style=" display: flex; align-items: center; flex-direction: column;">
    <div style="display: flex; align-items: center; ">
        Made by 
        <img src="https://www.facebook.com/images/fb_icon_325x325.png" height=40  style="margin: 0 10px; border: none;"/> 
    </div>
    <div style="display: flex; align-items: center; ">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" height=30 style="border: none;"/>React
    </div>
    <div style="display: flex; align-items: center; ">
        <img src="https://engineering.fb.com/wp-content/uploads/2017/04/gni6bqhilcfi2suaaaaaaaafcizpbj0jaaab.jpg" height=30 style="border: none;"/>Relay
    </div>
</div>

<img src="https://miro.medium.com/max/1358/0*CvbyACt1l2JKnbLZ.png" height=100 style="border: none;"/>

<div>
<a href="https://graphql.org/">A query language for your API</a>

</div>

Note: Open Source Public release 2015

Multi language support

One liner is...

"Which means you have a complete and understandable description of the data in your API giving the clients the power to ask for what they want and nothing more."

</section>

---

<!-- <img src="https://cdn-media-1.freecodecamp.org/images/kc0xvmMmSaF46CcliELfM8B78hev9NT3QkDG" height="550"/> -->

## Problem

<section>
    GET /genres

```
[
    {
        name: 'Mystery'
    },
    {
        name: 'Romance'
    }
]
```

</section>
<section>

```
[
    {
        name: 'Mystery'
        books: [
            {
                title: 'The lost man',
                author: 'Jane Harper'
            },
            {
                title: 'And then there were none'
                author: 'Agatha Christie'
            }
        ]
    },
]
```

Note:

book genres

but we also need to get books

typical to fetch them separately but if you can you would like to get it done in one request

so you tweak it to include books

Now anytime you fetch genres you get books with it which on mobile it becomes an issue of overfetching data

</section>

---

<section>
<h4>Describe your data</h4>
    <pre>
        <code>
    type Genre {
        name: String
        books: [Book]
    }
        </code>
    </pre>
</section>
<section>
<h4>Ask for what you want</h4>
    <pre>
        <code>
    genre(name: "Mystery"){
        name
        books{
            title
            author
        }
    }
        </code>
    </pre>
</section>
<section>
<h4>Get predictable results</h4>
    <pre>
        <code>
            genre{
                name: 'Mystery'
                books: [
                    {
                        title: 'The lost man',
                        author: 'Jane Harper'
                    },
                    {
                        title: 'And then there were none'
                        author: 'Agatha Christie'
                    }
                ]
            }
        </code>
    </pre>
</section>
---

# What does it solve?

-   Client driven instead of server driven

-   Development speed improvements

-   Self documenting

-   Single trip data fetching

Note:

Instead of having multiple "dumb" endpoints, we have one "smart" endpoint that can take complex queries and turn it into what the client needs

Also Frontend development is a breeze and requires less interactions with backend team to get what they need

Overfetching and underfetching data

---

## What issues does it cause?

-   Superfluous Database Calls `N+1`

    -   Solution: dataloader

-   Overkill for small applications

    -   Ensure you would benefit from it. More emphasis on frontend development.

-   Time to relearn another thing even though REST works

Note: Go into detail on N+1 with genres and books

-   REST works
    -   scalable
    -   well known

---

## What are the people saying?

[State of js 2019](https://2019.stateofjs.com/data-layer/graphql/)

## Who's using it in production?

AirBnB, GitHub, PayPal, Lyft, Starbucks, The New York Times, Twitter, Yelp

Note: How it will help you at Mile Two? We're starting to use this

Mobile

Spinning up quickly and not needing to spend as much time building infrastructure around a clean and simple REST api

---

## GraphQL fundamentals

### Queries

    GET

    useQuery, useLazyQuery

### Mutations

    PUT, PATCH, POST, DELETE

    useMutation

---

## Queries

    GET /books

        query {
            books{
                ...
            }
        }

    GET /book/1

        query {
            book(id: 1) {
                ...
            }
        }

---

## Mutations

    POST book?name=Storyteller

        mutation {
            createBook(
                {
                    name: 'Storyteller'
                }
            ){
                ... what you want to return
            }
        }

---

<section data-background-image="https://media0.giphy.com/media/pUs87dXYIIrTy/source.gif">
<h3>Now lets show that awesome frontend DX(Developer Experience)</h3>
</section>

---

### Things you'll need

```

npm install apollo-boost graphql @apollo/react-hooks

```

###### apollo-boost - Zero config apollo client

###### @apollo/react-hooks - Hooks for your queries/mutations

##### graphql - Write queries like so:

```

gql`
    query{
        users(id: 1){
             id
             name
        }
    }
`

```

---

<section>
    <h2>Some other perks</h2>
</section>

<section>
    <h3>Auto generated type safe responses</h3>
    <img src="https://github.com/keonik/learn-graphql/blob/master/assets/typed_response_data.png?raw=true" width="800">
</section>

---

## The End of Part 1. Stay tuned for API work!

---

# Learn Graphql Part 2: API time!

### Things you'll need

`npm install apollo-server pg reflect-metadata typeorm type-graphql`

##### apollo-server

-Server...

##### pg

Database - postgresql

##### reflect-metadata

Makes the decorator @ recognized for classes

##### typeorm

Object relational mapping for NodeJS with latest javascript features

##### type-graphql

Makes it so you can do graphql stuff but typed

---

### Create a model

```js
export class User {
    id
    firstName
    lastName
}

export class UserTyped {
    id: number
    firstName: string
    lastName: string
}
```

You'll use these across projects so typing has it's benefits

---

### Create entity

```js
import { Entity } from 'typeorm'

@Entity()
export class User {
    id: number
    firstName: string
    lastName: string
}
```

Tells server that this links to our orm

---

### Add table columns

```js
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string
}
```

Project is aware of database column

---

### Add type-graphql decorators

```js
...
import {ObjectType, ID, Field} from 'type-graphql';

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    firstName: string

    @Field(() => String)
    @Column()
    lastName: string
}
```

Lets graphql query the User object and their fields

---
