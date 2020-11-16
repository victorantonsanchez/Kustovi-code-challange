import express from 'express';
import validator from 'express-validator';
import passport from 'passport';
import TokenController from '../controllers/token.js';
import { UserStrategy } from '../strategies/local.js';

const { validationResult } = validator;

const { body } = validator;
const router = express.Router();
const schema = [
    body('email').isEmail().not().isEmpty(),
    body('password').not().isEmpty(),
    body('grant_type').equals('password'),
  ];

router.post('/', schema, (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  passport.use('UserStrategy', UserStrategy);
  passport.authenticate(UserStrategy, (err, user) =>  {
    if (!user) {
      res.status(401).json('Unauthorized');
    }

    req.user = user;
    TokenController.create(req, res);
  })(req, res, next);
});

export default router;