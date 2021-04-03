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
        console.error(err);
        res.sendStatus(500);
      });
};

// Fetches the total calorie and water count for a given date and user_id
const fetchDayCount = (req, res) => {
  // where does the userID info come from? req.query?
  // https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api

  // 'userID' defaults to 1 for testing purposes only
  // 'date' defaults to today's date (Format: "2021-04-03")
  const {userID = 1, date = new Date().toISOString().slice(0, 10)} = req.query;

  const queryString = `SELECT calories, water
                       FROM entries
                       WHERE user_id=${userID} AND date='${date}';`;

  pool.query(queryString)
      .then((response) => {
        let calorieSum = 0;
        let waterSum = 0;

        response.rows.forEach((entry) => {
          calorieSum += entry.calories;
          waterSum += entry.water;
        });

        res.send({calorieSum: calorieSum, waterSum: waterSum});
      }).catch((err) => {
        console.error(err);
        res.status(500).send();
      });
};

// insert into entries - calorie record
const insertCalories = (req, res) => {
  let { userId, mealType, calories, mealName } = req.body;
  const queryString = `INSERT INTO entries(type, calories, mealName, date, user_id)
                       VALUES(${mealType}, ${calories}, ${mealName}, current_timestamp, ${userId});`;
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
  const { waterType, userId, water } = req.body;
  const queryString = `INSERT INTO entries(type, water, date, user_id)
                       VALUES(${waterType}, ${water}, current_timestamp, ${userId})';`;
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
        console.error('whats is worng', err);
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
  fetchDayCount,
};

