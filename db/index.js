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

module.exports = {
  // put database query function exports here
  sampleQuery,
  fetchDayCount,
};
