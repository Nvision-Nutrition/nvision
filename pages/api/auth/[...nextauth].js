
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


const providers = [
    Providers.Credentials({
        name: 'Credentials',
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
]

const callbacks = {
    //get the JWT token from API response
    // async jwt(token, user) {
    //     if (user) {
    //         console.log('user: ', user)
    //         token.accessToken = user.token;
    //     }
    //     return token;
    // },
    async session(session, token) {
        console.log('token: ', token)
        // session.accessToken = token.iat;
        //12 hrs = 12 hrs * 60 min/hr * 60 sec/min
        console.log('session: ', session)
        return session;
    }
}

const session = {
  jwt: true,
  maxAge: 12 * 60 * 60,
  updateAge: 60*60*1
}


const options = {
    providers,
    session,
    callbacks
}

export default (req, res) => {
    NextAuth(req, res, options);

}
