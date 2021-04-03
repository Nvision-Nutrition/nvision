const { Pool } = require('pg');

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
        const sums = { calorieSum: calorieSum, waterSum: waterSum }
        resolve(sums);
      }).catch((err) => reject(err));

  })
}

/* Sends day sums to client for given userID and date */
const fetchDayCount = async (req, res) => {
  // where does the userID info come from? req.query?
  // https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api

  // 'userID' defaults to 1 for testing purposes only
  // 'date' defaults to today's date (Format: "2021-04-03")
  const { userID = 1, date = new Date().toISOString().slice(0, 10) } = req.query;

  try {
    const day = {};
    day[date] = await sumDay(userID, date);
    res.send(day);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
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
                  },
      ...
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
  fetchDayCount,
  fetchWeek
};
