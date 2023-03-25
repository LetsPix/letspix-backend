/**
 * DO NOT RUN THIS FILE. THIS IS FOR UPDATING THE ENTIRE DATABASE, FOR EXAMPLE, ADDING THE "NETFLIX" FIELD TO ALL
 */

const MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/NetflixDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// THIS FUNCTION DELETES SPECIFIC DOCUMENTS
async function deleteDocs() {
    try {
        const database = client.db("NetflixDatabase");
        const movies = database.collection("NetflixCollection");

        // this filter will specify which documents to delete
        const filter = { FIELD: 'FIELD FILTER'};

        const result = await movies.deleteMany(filter);
        console.log('Documents deleted');
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
// deleteDocs().catch(console.dir); // Commented out so it doesn't execute

// THIS FUNCTION DELETES A SPECIFIC FIELD FROM ALL DOCUMENTS 
async function deleteField() {
    try {
        const database = client.db("NetflixDatabase");
        const movies = database.collection("NetflixCollection");

        // this filter will specific which documents you want to remove a field from
        const filter = {};

        // this specifies which field you want removed from the documents
        const updateDoc = {
            $unset: {
            show_id: ''
            },
        };
        const result = await movies.updateMany(filter, updateDoc);
        console.log('Documents deleted.');
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
// deleteField().catch(console.dir); // Commented out so it doesn't execute


// THIS FUNCTION UPDATES ALL DOCUMENTS BY ADDING A NEW FIELD 
async function addField() {
    try {
        const database = client.db("NetflixDatabase");
        const movies = database.collection("NetflixCollection");

        // creates the filter. In this case its empty so it applies to all documents
        const filter = {};

        // Created the new field for each document
        const updateDoc = {
            $set: {
            service: 'Netflix'
        },
        };
        const result = await movies.updateMany(filter, updateDoc);
        console.log('Field(s) added.');
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
// addField().catch(console.dir); // Commented out so it doesn't execute