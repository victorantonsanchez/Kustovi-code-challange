import Film from '../models/film.js';
import validator from 'express-validator'
const { validationResult } = validator;

class FilmController {

    film = null
    constructor() {
        this.film = Film;
    }

    // Validate create a film in DB
    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const film = await this.film.create(req.body);
        res.json(film);
    }

    // Validate get all films of DB
    async getAll(req, res) {
        const films = await this.film.readAll();
        res.json(films);
    }

    // Validate get one film of DB
    async getOne(req, res) {
        const film = await this.film.readOne(req.params.id);
        if (!film) {
            res.status(404).json('film not found');
        }
        res.json(film);
    }

    // Validate update one film of DB
    async update(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const film = await this.film.update(req.params.id, req.body);
        if (!film) {
            res.status(404).json('film not found');
        }
        res.json(film);
    }

    // Validate remove one film of DB
    async remove(req, res) {
        const films = await this.film.delete(req.params.id);
        res.status(204).json('Not content');
    }
}

export default new FilmController();