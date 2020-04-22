# NodeJS with graphql template project

-   [Express server](https://expressjs.com/)
    -   standard unopinionated api platform
-   [apollo server](https://www.apollographql.com/docs/apollo-server/)
    -   developer tools and middleware
-   [typeorm](https://typeorm.io/#/)
    -   communication with your database
-   [type-graphql](https://typegraphql.com/)
    -   controlling access and endpoints to graphql data
-   [faker](https://www.npmjs.com/package/faker)
    -   seeding data quickly

---

## Getting Started

### Prerequisites

Using docker container

-   [Docker](https://www.docker.com/)

Local development

-   [NodeJS](https://nodejs.org/en/)
-   [Postgres](https://www.postgresql.org/)

---

### Startup

-   Run `npm install` to get all development dependencies. This will get rid of type errors in your IDE. All packages used in development however are inside the Docker container.

-   Run `make up` to run database and api in docker.

-   Run `make database-init` to get the database up to date quickly.
    -   _NOTE_ if you had an existing api running and made changes you may need to refresh your api container by doing one of the following
        -   Saving a file under src to trigger `ts-node` to refresh
        -   running `make down` then `make up` to cycle docker containers
-   Go to http://localhost:9000 and see the graphql playground to test queries and mutations

-   Health check is at http://localhost:9000/.well-known/apollo/server-health

    -   [Reference documentation](https://www.apollographql.com/docs/apollo-server/monitoring/health-checks/)

---

### Database

This is a Postgres databse using [TypeORM](https://typeorm.io/#/) for the ORM. In addition, [typeorm-seeding](https://github.com/w3tecch/typeorm-seeding) is used for dummy data seeding.

Run `make help` in the directory where the Makefile is to list all the commands used to interact with TypeORM and the database. **Note** that the docker stack must be running for most operations. Some operation in short:

-   Start the Docker stack
-   Run `make name=<name of migration> migration-generate`. This will output to the migrations directory specified in the ORM config.
-   Run `make migration-run` to run all migrations.
-   Run `make migration-revert` to roll back. Only does one at a time.
-   Run `make name=<name of migration> migration-create` to create an empty migration file.
-   Run `make database-seed` to seed data.
-   Run `make database-drop` to drop a database schema.
-   Run `make database-init` to drop the database, run migrations, then seed. Useful for a restart.

---

## Issues?

Create an issue in the [gitlab board](https://gitlab.com/mile-two/mile-two-resources/-/boards) for the mile-two-resources repository and tag one of the contributors

## Contributors

[<img src="https://www.miletwo.us/img/teamImgs/Fay-Web.png" width=40 alt="John Fay">](https://github.com/keonik) [<img src="https://www.miletwo.us/img/teamImgs/Thornbury-Web.png" width=40 alt="Alex Thornbury">](https://www.miletwo.us/about/alex-thornbury/)
