const queries = require('../../db/index.js');

export default (req, res) => {
  if (req.query.type === 'day') {
    queries.fetchDayCount(req, res);
  } else if (req.query.type === 'week') {
    queries.fetchWeek(req, res);
  } else {
    res.status(404).end();
  }
};

// disables the warning for an unresolved api request
export const config = {
  api: {
    externalResolver: true,
  },
};

