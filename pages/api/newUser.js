// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const queries = require('../../db/index.js');

export default (req, res) => {
  queries.addUser(req, res);
};

export const config = {
  api: {
    externalResolver: true,
  },
};
