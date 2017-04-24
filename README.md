# Simple REST API backend with Postgres

This simple node.js server was used during classes in EFREI (http://efrei.fr).
The students had to create a similar server from scratch and create several routes which would be checked against the provided Unit Tests.

This is the complete version. Be careful and provide only a barebone version to your students !

## What to give to students

You can fork this project and remove the Models (except Database.js) and the routes. You can also remove the routes from app.js, and some package from package.json if you don't want to leave any clues to your students.

## Installation

A simple `npm install` should be enough for the project.
The database is really hardcoded. 
* To initialize it `psql -U postgres < dumps/schema.sql`. This will create the database, the tables, the linked user and set its password.
* To initialize data, `psql -U postgres efrei < dumps/data-tests.sql`

The tests are using data-tests.sql. All this setup is arbitrary and can easily be changed.

## Exercises

The exercises are provided (in French), in the "Exercises" folder.
 
## Testing

The tests can be launch via `ava --serial --verbose tests\`. The `--serial` keyword is required to avoid concurrent database access (there is no mocking).

