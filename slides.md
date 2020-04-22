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
-   Example
    -   Tools
        -   What
        -   Why

---

<section>
<img src="https://github.com/keonik/learn-graphql/blob/master/assets/embarassing-author.jpeg" height="400">
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

### What is Graphql?

A query language for your API

[View the docs for yourself](https://graphql.org/)

Note: But first reference example

---

<img src="https://cdn-media-1.freecodecamp.org/images/kc0xvmMmSaF46CcliELfM8B78hev9NT3QkDG" height="550"/>

## Problem

Note:

Common Facebook problem

data on left - preview of frontend on right

Start with REST endpoint /posts to get an array of posts

But now you need user data to get this

So you tweak the posts endpoint to include likes containing user objects

This is normal in the REST architecture

...But wait, here comes mobile: problems: extra data ==> slowing things down

-   two endpoints
    -   with likes
    -   without likes

Even though this is a simple example even Good REST API's starting to show their limits

---

### What is Graphql?

A query language for your API

[View the docs for yourself](https://graphql.org/)

---

# What does it solve?

-   Instead of having multiple "simple" endpoints, we have one "smart" endpoint that can take complex queries and turn it into what the client needs
-   Having an assistant for your data
    -   groceries
    -   pizza
    -   dry cleaning

---

## What issues does it cause?

-   Superfluous Database Calls (N+1 problem go into more detail on n+1)
    -   Solution: dataloader batching/caching
-   All this relation ability causes performance issues
    -   query caching
-   Everything is a POST...
    -   not taking advantage of http methods and their features

Note: - REST works - scalable - well known

---

# What are the people saying?

## [State of js 2019](https://2019.stateofjs.com/data-layer/graphql/)

Note: How it will help you at Mile Two? We're starting to use this

## Professionally: it's taking over. Lots of companies are switching to this architecture so it will continue to become a lucrative skill to understand in the future

## Quick Explanation of the structure

### Queries

    GET

    useQuery, useLazyQuery

### Mutations

    PUT, POST, DELETE

    useMutation

---

<section data-background-image="https://media0.giphy.com/media/pUs87dXYIIrTy/source.gif">
	<h3>Now lets show that awesome frontend DX(Developer Experience)</h3>
</section>

---

### Things you'll need

```
npx create-react-app gql-demo
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
