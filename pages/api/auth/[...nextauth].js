import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const isCorrectCredentials = (credentials) => {

  //hash password here using argon2  

  //send query to db for username and password

  //if credentials.username comes back as a match in the db 
  // and credentials.passowrd (hashed) is === to the hashed version associated with the username in the db 
  // then its good to go

  return credentials.username === process.env.NEXTAUTH_USERNAME &&
  credentials.password === process.env.NEXTAUTH_PASSWORD;
}

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'vision' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
          //if credentials match 
        if (isCorrectCredentials(credentials)) {
          //return user to the app  
          const user = { id: 1, name: 'Admin' };
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
