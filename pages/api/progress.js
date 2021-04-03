const queries = require('../../db/index.js');

export default (req, res) => {
  queries.fetchDayCount(req, res);
};

// disables the warning for an unresolved api request
export const config = {
  api: {
    externalResolver: true,
  },
};
