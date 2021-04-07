/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
const db = require('../../../db/index');

const credentialsObject = async (credentials) => {
  // In futre hash password here using argon2
  // returns a user or nothing if username doesn't exist
  const user = await db.getUser(credentials.username);
  if (user !== undefined) {
    user.verdict = credentials.password === user.password ?
    true : false;
    return user;
  } else {
    user.verdict = false;
    return user;
  }
};


const providers = [
  Providers.Credentials({
    name: 'Credentials',
    credentials: {
      username: {label: 'Username', type: 'text', placeholder: 'vision'},
      password: {label: 'Password', type: 'password'},
    },
    authorize: async (credentials) => {
      // if credentials match
      const user = await credentialsObject(credentials);
      if (user.verdict) {
        // return user to callback
        return user;
      } else {
        // reject credentials
        return null;
      }
    },
  }),
];

const callbacks = {
  // After authorization come here
  // get the JWT token from API response
  async jwt(token, user, account, profile, isNewUser) {
    console.log('user: ', user);
    user && (token.user = user);
    return token;
  },
  async session(session, token) {
  // add user to session
    session.user = token.user;
    return session;
  },
};

const session = {
  // aging the session to expire at 12 hours (displays in zulu time)
  // update age seems to be how often the server checks for expiration
  jwt: true,
  maxAge: 12 * 60 * 60,
  updateAge: 60*60*1,
};


const options = {
  providers,
  session,
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);

