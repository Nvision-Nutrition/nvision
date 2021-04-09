
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
const db = require('../../../db/index');

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
            //set global flag to be credentials
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

    async jwt(token, user, account, profile) {
        //only pass information when user is not undefined
        if (user) {
            if (account.provider === 'google') {
                //verify they are a google user
                if (profile.verified_email === true) {
                    //verify they are a nvision user
                    var nvisionUser = await db.getUser(profile.email);
                    if (nvisionUser !== null) {
                        //verified nvision user
                        token.user = nvisionUser
                        return token;
                    } else {
                        //not an nvision user... reject
                        return false;
                    }
                } else {
                    //no google account ... reject
                    return false
                }
            } 
        }
        //handle provider.credentials
        user && (token.user = user);
        return token;
    },
    async session(session, token) {
        //pass in user and add to session
        session.user = token.user;
        return session;
    }

}

const session = {
    // enable json web token
    // age the session to expire at 12 hours (displays in zulu time)
    jwt: true,
    maxAge: 12 * 60 * 60,
};


const options = {
    providers,
    session,
    callbacks,
};


export default (req, res) => NextAuth(req, res, options);
