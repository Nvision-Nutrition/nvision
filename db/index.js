const { Pool } = require('pg');

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
  const { userID = 1, date = new Date().toISOString().slice(0, 10) } = req.query;

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

      res.send({ calorieSum: calorieSum, waterSum: waterSum });
    }).catch((err) => {
      console.error(err);
      res.status(500).send();
    });
};

const sumDay = (userID, date) => {
  const queryString = `SELECT calories, water
                       FROM entries
                       WHERE user_id=${userID} AND date='${date}';`;

  return new Promise((resolve, reject) => {

    pool.query(queryString)
      .then((response) => {
        let calorieSum = 0;
        let waterSum = 0;

        response.rows.forEach((entry) => {
          calorieSum += entry.calories;
          waterSum += entry.water;
        });
        const sums = { calorieSum: calorieSum, waterSum: waterSum }
        resolve(sums);
      }).catch((err) => reject(err));

  })
}

/*
    fetchWeek returns calorie and water sums for the past seven days in the following format:
  [
    { 2021-04-03: {
                    calorieCount: 2000,
                    waterCount: 86
                  },
      2021-04-02: {
                    calorieCount: 1800,
                    waterCount: 76
                  }
  ]
  */

const fetchWeek = async (req, res) => {
  try {
    const { userID = 1 } = req.query;

    let week = [];

    let today = new Date();
    // iterate through the past seven days
    for (let i = 0; i < 7; i++) {
      let currentDay = {};
      let date = new Date(today);
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().slice(0, 10);
      currentDay[formattedDate] = await sumDay(userID, formattedDate);
      week.push(currentDay);
    }

    res.send(week);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }

}

module.exports = {
  // put database query function exports here
  sampleQuery,
  fetchDayCount,
  fetchWeek
};
