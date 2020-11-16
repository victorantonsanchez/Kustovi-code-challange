import LocalStrategy from 'passport-local';
import User from '../models/user.js';

export const UserStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            // Search User
            const user = (await User.readByEmail(email)).shift();
            if (!user) {
                return done(null, false);    
            }

            // Verify password
            const isCheckPassword = User.checkPassword(password, user.password);
                if (!isCheckPassword) {
                return done(null, false);    
            }
            return done(null, user);                
        } catch(err) {
            return done(null, false);
        }
    }  
);