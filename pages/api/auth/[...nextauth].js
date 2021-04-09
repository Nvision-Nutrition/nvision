const argon2 = require('argon2')
const db = require('../../../db/index');

//next auth must be in this js module format
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const credentialsObject = async (credentials) => {
    // In futre hash password here using argon2
    //returns a user or nothing if username doesn't exist
    try {
        var user = await db.getUser(credentials.email);


        if (user !== null) {
            //hash input password and compare
            user.verdict = await argon2.verify(user.password, credentials.password);
            return user;

        } else {
            let user = {
                verdict: false
            }
            return user;
        }
    } catch (e) {
        //probably didn't hash the password coming in 
        console.error(e);
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
            try {
                const user = await credentialsObject(credentials);
                if (user.verdict) {
                    //return user to callback
                    return user;
                } else {
                    //reject credentials
                    return null;
                }
            } catch (e) {
                console.error(e);
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
        try {
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
        } catch(e) {
            console.error(e);
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
