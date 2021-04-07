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
const sumDay = (userId, date) => {
  const queryString = `SELECT calories, water
                       FROM entries
                       WHERE user_id=$1 AND date=$2;`;

  return new Promise((resolve, reject) => {
    pool.query(queryString, [userId, date])
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
  checks if username exists already in database
    if so, returns userID
    if not returns -1
    (returns a Promise)
*/
const getUsernameID = (username) => {
  const checkQuery = `Select id FROM users
                      WHERE username=$1;`;

  return new Promise((resolve, reject) => {
    pool.query(checkQuery, [username])
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
  adds a new user to the database provided the username
  is not already taken
*/
const addUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    password,
    calorieGoal,
    waterGoal,
    weightGoal,
    phone,
    email,
    sex,
  } = req.body;

  try {
    const userID = await getUsernameID(username);
    if (userID !== -1) {
      // user exists already
      res.status(501).send(`user exists already with userID: ${userID}`);
    } else {
      // create a new user
      const queryString = `INSERT INTO users(
        firstName, lastName, username,
        password, calorieGoal, waterGoal,
        weightGoal, phone, email, sex)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;`;

      // eslint-disable-next-line max-len
      pool.query(queryString, [firstName, lastName, username, password, calorieGoal, waterGoal, weightGoal, phone, email, sex])
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

//with username get user information
const getUser = async (username) => {
  
  const userID = await getUsernameID(username);
  if (userID === -1) {
    return null; 
  }
  const queryString = `SELECT * FROM users WHERE id=${userID}`
  return new Promise((resolve, reject) => {
  pool.query(queryString)
    .then((result) => {
      resolve(result.rows[0]);
    })
    .catch((err) => {
      reject(err);
    })
  })
}




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
  getUser
};
