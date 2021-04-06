// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const queries = require('../../db/index.js');

export default function success(req, res) {
  queries.getSuccess(req, res);
};

export const config = {
  api: {
    externalResolver: true,
  },
};
