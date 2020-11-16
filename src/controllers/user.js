import User from '../models/user.js';
import validator from 'express-validator'
const { validationResult } = validator;

class UserController {

    user = null
    constructor() {
        this.user = User;
    }

    // Validate create new user in DB
    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userDB = (await User.readByEmail(req.body.email)).shift();
        if (userDB) {
            return res.status(400).json('Bad request');  
        }

        const user = await this.user.create(req.body);
        res.json(user);
    }
}

export default new UserController();