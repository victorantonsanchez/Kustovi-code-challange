import Token from '../models/token.js';

class TokenController {

    token = null
    constructor() {
        this.token = Token;
    }

    // Validate create new token for a user register in DB
    async create(req, res) {
        const token = await this.token.create(req.user);
        if (!token) {
            res.status(401).json('Unauthorized');    
        }
        res.json(token);
    }
}

export default new TokenController();