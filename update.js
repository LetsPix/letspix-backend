/**
 * DO NOT RUN THIS FILE. THIS IS FOR UPDATING THE ENTIRE DATABASE, FOR EXAMPLE, ADDING THE "NETFLIX" FIELD TO ALL DOCUMENTS FROM NETFLIX.
 */

const MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/NetflixDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("NetflixDatabase");
    const movies = database.collection("NetflixCollection");

    // create a filter to update all movies with a 'G' rating
    const filter = {};

    // increment every document matching the filter with 2 more comments
    const updateDoc = {
      $set: {
        service: 'Netflix'
      },
    };
    const result = await movies.updateMany(filter, updateDoc);
    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
