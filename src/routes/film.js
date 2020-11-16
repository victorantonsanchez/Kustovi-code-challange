import validator from 'express-validator'
import express from 'express';
import passport from 'passport';
import FilmController from '../controllers/film.js'
import { BearerStrategyLocal } from '../strategies/bearer.js';

const { body } = validator;
const router = express.Router();
const schema = [
    body('id').optional(),
    body('title').isString().not().isEmpty(),
    body('genre').not().isEmpty(),
    body('year').isNumeric().not().isEmpty(),
    body('description').not().isEmpty()
  ];

router.post('/', [schema, authorizationUser], (req, res) => {
    FilmController.create(req, res);
});

router.get('/', (req, res) => {
    FilmController.getAll(req, res);
});

router.get('/:id', (req, res) => {
    FilmController.getOne(req, res);
});

router.patch('/:id', [schema, authorizationUser], (req, res) => {
    FilmController.update(req, res);
});

router.delete('/:id', authorizationUser, (req, res) => {
    FilmController.remove(req, res);
});

// Middleware Authorization User
function authorizationUser(req, res, next) {
    passport.use('BearerStrategy', BearerStrategyLocal);    
    passport.authenticate(BearerStrategyLocal, (err, token) => {
      if (!token) {
        return res.status(401).json('Unauthorized');
      }
      next();
    })(req, res, next);
  }

export default router;