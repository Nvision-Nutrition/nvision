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

module.exports = {
  // put database query function exports here
  sampleQuery,
};
