import express from 'express';
import passport from 'passport';
import config from './src/config.js';
import UserRouter from './src/routes/user.js';
import TokenRouter from './src/routes/token.js';
import FilmRouter from './src/routes/film.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/users', UserRouter);
app.use('/tokens', TokenRouter);
app.use('/films', FilmRouter);


const port = config.app.port;
app.listen(port, () => {
  console.log(`Kustovi Film app listening at http://localhost:${port}`);
})