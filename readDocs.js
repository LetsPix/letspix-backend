// Will read documents in the mongodb database
const MongoClient = require("mongodb").MongoClient;
const constants = require('./ConnectionConstants.js');

function readAll(uri, databaseName, collectionName){
    MongoClient.connect(uri).then((client) => {
        const connect = client.db(databaseName);

        // Connect to collection
        const conn = connect.collection(collectionName);
        conn.find({}).toArray().then((data) => {
        console.log(data);
    });

    }).catch((err) => {
        // Printing the error message
        console.log(err.Message);
    })
}

// Calling the function
readAll(constants.uri, constants.databaseName, constants.collectionName);