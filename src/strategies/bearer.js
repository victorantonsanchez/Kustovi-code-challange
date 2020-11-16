import BearerStrategy from 'passport-http-bearer';
import User from '../models/user.js';
import Token from '../models/token.js';

export const BearerStrategyLocal = new BearerStrategy(
    async (token, done) => {
      try {
        // Verify token
        const tokenData = Token.verify(token, 'admin');

        // Search User
        const user = await User.readOne(tokenData.issuer);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(null, false);
      }
    }
  );