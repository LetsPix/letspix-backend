const express = require('express');
const { MongoClient } = require('mongodb');
const constants = require('./ConnectionConstants.js');
const app = express();
app.use(express.static("public"))

const uri = constants.uri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.redirect('/home')
});

app.get('/home',(req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/home/api/data/netflix', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db(constants.databaseName).collection(constants.collectionName);
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});



const port = process.env.PORT || 3000

app.listen(port, function() {
	console.log(`Server is running at ${port}`)
})
