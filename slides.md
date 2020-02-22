---
title: How to suck less
---

# Learning Graphql

John Fay

03/21/2020

---

## Agenda

-   What is graphql?
-   What problem does it solve?
-   What problems does it introduce?
-   Example
    -   Tools
        -   What
        -   Why

---

# What is Graphql?

Yes? ;)

---

### Now lets show that awesome frontend DX(Developer Experience)

## ![Excited](https://media0.giphy.com/media/pUs87dXYIIrTy/source.gif)

---

### Things you'll need

-   `npx create-react-app gql-demo`
-   `npm install apollo-boost graphql @apollo/react-hooks`

##### apollo-boost

Zero config apollo client

#### @apollo/react-hooks

Hooks for your queries/mutations

#### graphql

Write queries like so: gql``

---

# Now onto the API work

---

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
