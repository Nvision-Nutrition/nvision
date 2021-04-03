// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const queries = require('../../db/index.js');

export default (req, res) => {
  queries.insertCalories(req, res);
};

// disable unresolved api request - another option is to return a promise in db query
export const config = {
  api: {
    externalResolver: true,
  },
};