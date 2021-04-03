const {Pool} = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: 'nvision',
  password: process.env.POSTGRES_PASS,
  port: 5432,
});

// write database query functions here:

// this is a sampleQuery for reference on how to communciate with the database:
const sampleQuery = (req, res) => {
  const userID = req.body.user_id || 1;
  const queryString = `SELECT *
                       FROM entries
                       WHERE user_id='${userID}';`;

  pool.query(queryString)
      .then((response) => {
        // do stuff with the response from db here

        // send nicely formatted data back to the client here:
        res.send(response);
      }).catch((err) => {
        res.sendStatus(500);
        console.error(err);
      });
};

// insert into entries - calorie record
const insertCalories = (req, res) => {
  const { userId, type, calories, mealName } = req.body;
  const queryString = `INSERT INTO entries(type, calories, mealName, date, user_id)
                       VALUES($1, $2, $3, current_timestamp, $4)';`,
                       [type, calories, mealName, userId];
  pool.query(queryString)
      .then((response) => {
        res.status(201).send('Calorie entry successful!');
      }).catch((err) => {
        console.error(err);
        res.status(400).send(err);
      });
}

// insert into entries - water record
const insertWater = (req, res) => {
  const { userId, type, water, mealName } = req.body;
  const queryString = `INSERT INTO entries(type, water, mealName, date, user_id)
                       VALUES($1, $2, $3, current_timestamp, $4)';`,
                       [type, water, mealName, userId];
  pool.query(queryString)
      .then((response) => {
        res.status(201).send('Water entry successful!');
      }).catch((err) => {
        console.error(err);
        res.status(400).send(err);
      });
}

// get a random fail quote
const getFail = (req, res) => {
  const queryString = 'SELECT failure_quote FROM quotes ORDER BY RANDOM() LIMIT 1';

  pool.query(queryString)
      .then((fail_quote) => {
        res.status(200).send(fail_quote.rows);
      }).catch((err) => {
        console.error(err);
        res.status(404).send(err);
      });
}

// get a random success quote
const getSuccess = (req, res) => {
  const queryString = 'SELECT success_quote FROM quotes ORDER BY RANDOM() LIMIT 1';

  pool.query(queryString)
      .then((success_quote) => {
        res.status(200).send(success_quote.rows);
      }).catch((err) => {
        console.error(err);
        res.status(404).send(err);
      });
  }



module.exports = {
  // put database query function exports here
  sampleQuery,
  insertCalories,
  insertWater,
  getSuccess,
  getFail,
};


'SELECT failure_quote FROM quotes ORDER BY RANDOM() LIMIT 1'