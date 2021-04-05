const {Pool} = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: 'nvision',
  password: process.env.POSTGRES_PASS,
  port: 5432,
});

/*
  fetches the total calorie and water count for a given date and userID
  (returns a promise)
*/
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
          const sums = {calorieSum: calorieSum, waterSum: waterSum};
          resolve(sums);
        }).catch((err) => reject(err));
  });
};

/* Sends day sums to client for given userID and date */
const fetchDayCount = async (req, res) => {
  // where does the userID info come from? req.query?
  // https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api

  // 'userID' defaults to 1 for testing purposes only
  // 'date' defaults to today's date (Format: "2021-04-03")
  const {userID = 1, date = new Date().toISOString().slice(0, 10)} = req.query;

  try {
    const day = {};
    day[date] = await sumDay(userID, date);
    res.send(day);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

/*
  fetchWeek returns calorie and water sums for past seven days in the format:
  [
    { 2021-04-03: {
                    calorieCount: 2000,
                    waterCount: 86
                  },
      2021-04-02: {
                    calorieCount: 1800,
                    waterCount: 76
                  },
      ...
  ]
*/
const fetchWeek = async (req, res) => {
  try {
    const {userID = 1} = req.query;
    const week = [];
    const today = new Date();

    // iterate through the past seven days
    for (let i = 0; i < 7; i++) {
      const currentDay = {};
      const date = new Date(today);
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
};

// insert into entries table - calorie record
const insertCalories = (req, res) => {
  const {userId, mealType, calories, mealName} = req.body;
  const queryString = `INSERT INTO entries
                       (type, calories, mealName, date, user_id)
                       VALUES(${mealType},${calories}, ${mealName},
                              current_timestamp, ${userId});`;
  pool.query(queryString)
      .then((response) => {
        res.status(201).send('Calorie entry successful!');
      }).catch((err) => {
        console.error(err);
        res.status(400).send(err);
      });
};

// insert into entries table - water record
const insertWater = (req, res) => {
  const {waterType, userId, water} = req.body;
  const queryString = `INSERT INTO entries(type, water, date, user_id)
                       VALUES(${waterType}, ${water},
                       current_timestamp, ${userId})';`;
  pool.query(queryString)
      .then((response) => {
        res.status(201).send('Water entry successful!');
      }).catch((err) => {
        console.error(err);
        res.status(400).send(err);
      });
};

// get a random fail quote
const getFail = (req, res) => {
  const queryString = `SELECT failure_quote
                       FROM quotes ORDER BY RANDOM() LIMIT 1`;

  pool.query(queryString)
      .then((failQuote) => {
        res.status(200).send(failQuote.rows);
      }).catch((err) => {
        console.error(err);
        res.status(404).send(err);
      });
};

// get a random success quote
const getSuccess = (req, res) => {
  const queryString = `SELECT success_quote
                       FROM quotes ORDER BY RANDOM() LIMIT 1`;

  pool.query(queryString)
      .then((successQuote) => {
        res.status(200).send(successQuote.rows);
      }).catch((err) => {
        console.error(err);
        res.status(404).send(err);
      });
};

module.exports = {
  insertCalories,
  insertWater,
  getSuccess,
  getFail,
  fetchDayCount,
  fetchWeek,
};
