import firebase from 'firebase-admin';
import config from '../config.js';

class FirebaseProvider {
    firestore = null;
    collection = null;
    constructor() {
        const app = firebase.initializeApp({
            credential: firebase.credential.cert(config.providers.firebase)
        });
        this.firestore = firebase.firestore();
    }

    // Create and update documents in specific collection
    async save(data = {}, collection) {
        if (!data || !collection) {
            return;
        }

        try {
            this.collection = this.firestore.collection(collection);
            const docRef = data.id ? this.collection.doc(data.id) : this.collection;
            let document = {};

            if (data.id) {
                await docRef.update(data);
                document = data;
            } else {
                let snapshot = await docRef.add(data);
                snapshot = await snapshot.get();
                document = mergeData(snapshot);
                
            }
            return document
        } catch(err) {
            return;
        }    
    }

    // Get documents by field ID of specific collection
    async read(id = null, collection) {

        if (!collection) {
            return;
        }
        
        try {
            this.collection = this.firestore.collection(collection);
            const snapshot = await (id ? this.collection.doc(id) : this.collection).get();
            let documents = [];
            if (id && snapshot.exists) {
                documents = mergeData(snapshot);
            } else {
                snapshot.forEach(document => {
                    const documentData = mergeData(document);
                    documents.push(documentData);
                });
            }
            return documents;
        } catch (err) {
            return;
        }
    }

    // Get documents by query (any field of document) of specific collection
    async readByQuery(field, collection) {

        if (!field || !collection) {
            return;
        }

        try {
            this.collection = this.firestore.collection(collection);
            const snapshot = await this.collection.where(field.name, '==', field.value).get();
            let documents = [];
            snapshot.forEach(document => {
                const documentData = mergeData(document);
                documents.push(documentData);
            });
            return documents;
        } catch (err) {
            return;
        }
    }

    // Delete documents in specific collection
    async delete(id = null, collection) {
        if (!id || !collection) {
            return;
        }
        this.collection = this.firestore.collection(collection);
        await this.collection.doc(id).delete();
        return true;
    }
}    

// Join id and data of document
function mergeData(document) {
    return Object.assign({
        id: document.id
    }, document.data());
};

export default new FirebaseProvider();