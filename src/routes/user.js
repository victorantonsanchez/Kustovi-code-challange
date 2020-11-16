import validator from 'express-validator';
import UserController from '../controllers/user.js';
import express from 'express';

const { body } = validator;
const router = express.Router();
const schema = [
    body('name').isString().not().isEmpty(),
    body('email').isEmail().not().isEmpty(),
    body('password').not().isEmpty()
  ];

router.post('/', schema, (req, res) => {
    UserController.create(req, res);
});

export default router;