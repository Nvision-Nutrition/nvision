import { SingleBedOutlined } from '@material-ui/icons';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
const db = require('../../../db/index')

const credentialsObject = async (credentials) => {
    // In futre hash password here using argon2
    //returns a user or nothing if username doesn't exist
    var user = await db.getUser(credentials.email);
    if (user !== null) {
        user.verdict = credentials.password === user.password ? 
        true : false;
        return user;

    } else {
        let user = {
            verdict: false
        }
        return user;
    }
}


const providers = [
    Providers.Credentials({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text', placeholder: 'vision@gmail.com' },
            password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
            //if credentials match 
            const user = await credentialsObject(credentials);
            if (user.verdict) {
                //return user to callback
                return user;
            } else {
                //reject credentials
                return null;
            }
        },
    }),
    //add google auth - how to make it persist if it doesn't already?  I'd like to continue with JWT
    Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
]

const callbacks = {
    //After authorization come here
    //get the JWT token from API response
    async jwt(token, user, account, profile, isNewUser) {
            user && (token.user = user);
            return token;
    },
    async session(session, token) {
        //add user to session
        session.user = token.user;
        return session;
    },
    async signIn(user, account, profile) {
        if (account.provider === 'google' &&
            profile.verified_email === true &&
            profile.email.endsWith('@gmail.com')) {
                console.log('Google came back')
                console.log('profile: ', profile)
                console.log('account: ', account)
                console.log('user: ', user)
                return true
            } else {
                return false
            }
    }
}

const session = {
  //aging the session to expire at 12 hours (displays in zulu time)
  //update age seems to be how often the server checks for expiration
  jwt: true,
  maxAge: 12 * 60 * 60,
  updateAge: 60*60*1
}


const options = {
    providers,
    session,
    callbacks
}

export default (req, res) => NextAuth(req, res, options);

