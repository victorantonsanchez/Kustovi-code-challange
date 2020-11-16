import * as functions from 'firebase-functions';
import express from 'express';
import passport from 'passport';
import UserRouter from './src/routes/user.js';
import TokenRouter from './src/routes/token.js';
import FilmRouter from './src/routes/film.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/users', UserRouter);
app.use('/tokens', TokenRouter);
app.use('/films', FilmRouter);

export const webApi = functions.https.onRequest(app);