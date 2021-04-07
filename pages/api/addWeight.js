const queries = require('../../db/index.js');

export default (req, res) => {
  queries.insertWeight(req, res);
};

export const config = {
  api: {
    externalResolver: true,
  },
};
