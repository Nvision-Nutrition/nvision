import { signIn } from 'next-auth/client';
import { redirect } from 'next/dist/next-server/server/api-utils';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const queries = require('../../db/index.js');
const NextAuth = require('next-auth');

export default (req, res) => {
  //shape data
  const user = req.body;
  user.password = user.password1;
  delete user.password1;
  delete user.password2;
  user.phone = Number(user.phone);
  console.log(user)
  //add the user
  queries.addUser(req, res);
  
  //future -- implement a redirect to the login page or assign session
};

export const config = {
  api: {
    externalResolver: true,
  },
};
