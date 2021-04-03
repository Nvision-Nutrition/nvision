DROP DATABASE IF EXISTS nvision;
CREATE DATABASE nvision;
\c nvision;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
 id          serial NOT NULL PRIMARY KEY,
 firstName   varchar(50),
 lastName    varchar(50),
 username    varchar(50) NOT NULL,
 password    varchar(50) NOT NULL,
 calorieGoal smallint NOT NULL DEFAULT 2000,
 waterGoal   smallint NOT NULL,
 weightGoal  smallint,
 phone       numeric,
 email       varchar(50) NOT NULL,
 sex         varchar(50)
);

CREATE TYPE mealType_t as enum('food', 'water');
CREATE TYPE mealName_t as enum('breakfast', 'lunch', 'dinner', 'snack');

DROP TABLE IF EXISTS entries CASCADE;

CREATE TABLE entries
(
 id             serial PRIMARY KEY,
 type           mealType_t,
 calories       smallint,
 fatContent     smallint,
 carbContent    smallint,
 proteinContent smallint,
 water          smallint,
 weight         smallint,
 mealName       mealName_t,
 date           date NOT NULL,
 user_id        integer references users(id)
);