/* pooling connection not supported on heroku dev tier:
const {Pool} = require('pg');
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'ec2-54-211-176-156.compute-1.amazonaws.com',
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASS,
  port: 5432,
});
*/

const {Client} = require('pg');

const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
//local testing client below
// const pool = new Client({
//   user: 'orennelson',
//   host: 'localhost',
//   database: 'nvision',
//   password: 'password',
//   port: 5432,
// });

/* Helper Function to find local date */
const getCurrentDate = () => {
  // Since there is no 'local' timezone in heroku we will have to set
  // the timezone manually.  Setting to Denver should fix most
  // bugs, but ideally date will be passed into each query string
  const todayMST = new Date().toLocaleString('sv', {
    timeZone: 'America/Denver',
  });
  const today = todayMST.slice(0, 10);
  return today;
};
  // Keeping the visual check if anyone wants to see it
  // we should remove this line by Saturday
  // console.log(getCurrentDate());
pool.connect();

/*
  fetches the total calorie and water count for a given date and userID
  (returns a promise)
*/

pool.connect();
const sumDay = (userId, date) => {
  const queryString = `SELECT calories, water, weight
                       FROM entries
                       WHERE user_id=$1 AND date=$2;`;

  return new Promise((resolve, reject) => {
    pool.query(queryString, [userId, date])
        .then((response) => {
          let calorieSum = 0;
          let waterSum = 0;

          // Leaving this as weight sum even though it is a 1 off val
          // for cohesiveness in my later fetches.
          let weightSum = 0;

          response.rows.forEach((entry) => {
            calorieSum += entry.calories;
            waterSum += entry.water;
            weightSum = entry.weight; // fetches last input value
          });
          const sums = {
            calorieSum: calorieSum,
            waterSum: waterSum,
            weightSum: weightSum,
          };
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
  const {userId, date = getCurrentDate()} = req.query;

  try {
    const day = {};
    day[date] = await sumDay(userId, date);
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
    const {userId} = req.query; // Adjusted to match other requests
    const week = [];

    // iterate through the past seven days
    let lastWeight = 0;
    for (let i = 6; i >= 0; i--) { // Reversing for chart
      const currentDay = {};
      const date = new Date();
      if (date.toISOString().slice(0, 10) === getCurrentDate()) {
        // this signals that the UTC is on the same day as our MST default
        // no logic adjustment needed
        date.setDate(date.getDate() - i);
      } else {
        // this signals that the UTC is ahead by 1 day, so we should subtract 1
        date.setDate(date.getDate() - i - 1);
      }
      const formattedDate = date.toISOString().slice(0, 10);

      currentDay[formattedDate] = await sumDay(
          userId,
          formattedDate);
      lastWeight = currentDay[formattedDate].weightSum !== 0 ?
        currentDay[formattedDate].weightSum :
        lastWeight;

      // eslint-disable-next-line max-len
      currentDay[formattedDate].weightSum = currentDay[formattedDate].weightSum === 0 ?
        lastWeight :
        currentDay[formattedDate].weightSum;
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
  const {userId, mealType, calories, mealName, usersDate} = req.body;
  const queryString = `INSERT INTO entries
                       (type, calories, mealName, date, user_id)
                       VALUES($1, $2, $3, $4, $5);`;
  pool.query(queryString, [mealType, calories, mealName, usersDate, userId])
      .then((response) => {
        res.status(201).send('Calorie entry successful!');
      }).catch((err) => {
        console.error(err);
        res.status(400).send(err);
      });
};

/*
  checks if email exists already in database
    if so, returns userID
    if not returns -1
    (returns a Promise)
*/
const getEmail = (email) => {
  const checkQuery = `Select id FROM users
                      WHERE email=$1;`;

  return new Promise((resolve, reject) => {
    pool.query(checkQuery, [email])
        .then((response) => {
          if (response.rows.length === 0) {
            resolve(-1);
          } else {
            resolve(response.rows[0].id);
          }
        }).catch((err) => {
          reject(err);
        });
  });
};

/*
  adds a new user to the database provided the email
  is not already taken
*/
const addUser = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    calorieGoal,
    waterGoal,
    weightGoal,
    phone,
    email,
    sex,
  } = req.body;

  try {
    const userID = await getEmail(email);
    if (userID !== -1) {
      // user exists already
      res.status(501).send(`user exists already with userID: ${userID}`);
    } else {
      // create a new user
      const queryString = `INSERT INTO users(
        firstName, lastName,
        password, calorieGoal, waterGoal,
        weightGoal, phone, email, sex)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id;`;

      // eslint-disable-next-line max-len
      pool.query(queryString, [firstName, lastName, password, calorieGoal, waterGoal, weightGoal, phone, email, sex])
          .then((response) => {
            const userID = response.rows[0].id;
            res.status(201).send(`New user created with ID: ${userID}`);
          }).catch((err) => {
            console.error(err);
            res.send(500);
          });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// with username get user information
const getUser = async (email) => {
  const userID = await getEmail(email);
  if (userID === -1) {
    return null;
  }

  const queryString = `SELECT * FROM users WHERE id=$1`;
  return new Promise((resolve, reject) => {
    pool.query(queryString, [userID])
        .then((result) => {
          resolve(result.rows[0]);
        })
        .catch((err) => {
          reject(err);
        });
  });
};

// insert into entries table - water record
const insertWater = (req, res) => {
  const {waterType, userId, water, usersDate} = req.body;
  const queryString = `INSERT INTO entries(type, water, date, user_id)
                       VALUES($1, $2,$3, $4);`;
  pool.query(queryString, [waterType, water, usersDate, userId])
      .then((response) => {
        res.status(201).send('Water entry successful!');
      }).catch((err) => {
        console.error(err);
        res.status(400).send(err);
      });
};

// insert into entries table - water record
const insertWeight = (req, res) => {
  const {type, weight, usersDate, userId} = req.body;
  const queryString = `INSERT INTO entries(type, weight, date, user_id)
                       VALUES($1, $2,$3, $4);`;
  pool.query(queryString, [type, weight, usersDate, userId])
      .then((response) => {
        res.status(201).send('Weight entry successful!');
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
  insertWeight,
  getSuccess,
  getFail,
  fetchDayCount,
  fetchWeek,
  addUser,
  getUser,
};
