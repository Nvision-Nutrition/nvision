// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const queries = require('../../db/index.js');

export default (req, res) => {
  queries.getSuccess(req, res);
};

/*

This is what existed in this sample file previously, for reference:

export default (req, res) => {
  res.status(200).json({name: 'John Doe'});
};

*/
