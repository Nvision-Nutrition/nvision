import { ContactSupportOutlined, FormatColorReset } from '@material-ui/icons';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
const db = require('../../../db/index')

const credentialsObject = async (credentials) => {
    // In futre hash password here using argon2
    //returns a user or nothing if username doesn't exist
    var user = await db.getUser(credentials.username);
    if (user !== undefined) {
        user.verdict = credentials.password === user.password ? 
        true : false;
        return user;

    } else {
        user.verdict = false;
        return user;
    }
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
            const user = await credentialsObject(credentials)
            if (user.verdict) {
                //return user to app
                console.log(user)
                return Promise.resolve(user);
            } else {
                //reject credentials
                return Promise.resolve(null);
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
        // session.accessToken = token.iat;
        //12 hrs = 12 hrs * 60 min/hr * 60 sec/min
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
  
}

export default (req, res) => NextAuth(req, res, options);

