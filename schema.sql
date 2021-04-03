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

DROP TABLE IF EXISTS quotes CASCADE;

CREATE TABLE quotes
(
 id                serial PRIMARY KEY,
 failure_quote  varchar(1000),
 success_quote     varchar(1000)
);

INSERT INTO quotes(failure_quote) VALUES('Failure is success in progress, you got this!');
INSERT INTO quotes(failure_quote) VALUES('It is not a matter of if, but when. Persevere and be patient, it will happen');
INSERT INTO quotes(failure_quote) VALUES('It''s not a no, it''s a not yet. Don''t give up!');
INSERT INTO quotes(failure_quote) VALUES('You learn more from failure than from success. Don''t let it stop you. Failure builds character');
INSERT INTO quotes(failure_quote) VALUES('Remember that perserverance takes you where quiters can''t go, don''t give up!');
INSERT INTO quotes(failure_quote) VALUES('Every day is a new beginning, take a deep breath, smile, and start again');
INSERT INTO quotes(failure_quote) VALUES('Don''t let your struggles infiltrate your joy, remember your goal!');
INSERT INTO quotes(failure_quote) VALUES('You are not defined by your mistakes, tomorrow is a new day');
INSERT INTO quotes(failure_quote) VALUES('You only are given one body, love it and treat it well, you got this!');
INSERT INTO quotes(failure_quote) VALUES('Your present circumstances don''t determine where you can go; they merely determine where you start');
INSERT INTO quotes(failure_quote) VALUES('Believe in yourself and in your goals, because we do!');
INSERT INTO quotes(failure_quote) VALUES('Mistakes are inevitable, but as long as you keep trying, you will remain perfect!');
INSERT INTO quotes(failure_quote) VALUES('You will gain confidence with every small positive change you are making.');
INSERT INTO quotes(failure_quote) VALUES('You can accomplish anything you set your mind to!');


INSERT INTO quotes(success_quote) VALUES('Keep going! You are doing great!');
INSERT INTO quotes(success_quote) VALUES('Your hard work will not go unnoticed!');
INSERT INTO quotes(success_quote) VALUES('You''ve got this!');
INSERT INTO quotes(success_quote) VALUES('Keep up the great work!');
INSERT INTO quotes(success_quote) VALUES('Congratulations! You are on track with your goals!');
