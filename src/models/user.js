import FirebaseProvider from '../providers/firebase.js';
import bcrypt from 'bcryptjs';
import config from '../config.js';


class User {
    collection = "users";
    firebaseProvider = null
    constructor() {
        this.firebaseProvider = FirebaseProvider;
    }
    
    // Create new user in DB
    async create(data = {}) {
        if (!data) {
            return;
        }

        const hash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(config.app.bcrypt.salt));
        data.password = hash;
        return await this.firebaseProvider.save(data, this.collection);
    }

    // Get one user of DB
    async readOne(id = null) {
        if (!id) {
            return;
        }
        return await this.firebaseProvider.read(id, this.collection);
    }
    
    // Get one user by field email of DB
    async readByEmail(email) {
        if (!email) {
            return;
        }
        return await this.firebaseProvider.readByQuery({name : "email", value : email}, this.collection);
    }

    // Campare the passwords of set user in DB and typing in request login
    checkPassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

export default new User();