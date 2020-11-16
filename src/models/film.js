import FirebaseProvider from '../providers/firebase.js';

class Film {
    collection = "films";
    firebaseProvider = null
    constructor() {
        this.firebaseProvider = FirebaseProvider;
    }
    
    // Create a film in DB
    async create(data = {}) {
        if (!data) {
            return;
        }
        return await this.firebaseProvider.save(data, this.collection);
    }

    // Update one film of DB
    async update(id, data = {}) {
        if (!id || !data) {
            return;
        }

        data.id = id;
        return await this.firebaseProvider.save(data, this.collection);
    }

    // Get all films of DB
    async readAll() {
        return await this.firebaseProvider.read(null, this.collection);
    }

    // Get one film of DB
    async readOne(id = null) {
        if (!id) {
            return;
        }
        return await this.firebaseProvider.read(id, this.collection);
    }

    // Remove one film of DB
    async delete(id = null) {
        if (!id) {
            return;
        }
        return await this.firebaseProvider.delete(id, this.collection);
    }
}

export default new Film();