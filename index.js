// requirements
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const constants = require('./ConnectionConstants')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public')); // this will use the index.html as the default page for now. We will move this to the frontend after testing.

// MongoDB info
const uri = constants.uri;
const collectionName = constants.collectionName;

// connecting 
const port = process.env.PORT || 3000 // port number
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => console.error(err));

// Defining the schema 
const mediaSchema = new mongoose.Schema ({
    type: { type: String, required: true },
    title: { type: String, required: true }, 
    director: { type: String, required: true }, 
    country: { type: String, required: true }, 
    date_added: { type: String, required: true }, 
    release_year: { type: String, required: true }, 
    rating: { type: String, required: true }, 
    duration: { type: String, required: true }, 
    listed_in: { type: String, required: true }, 
    description: { type: String, required: true },
    service: {type: String, required: true}
});

const Media = mongoose.model('Media', mediaSchema, collectionName);

// create media
app.post('/create', async (req, res) => {
    try {
        const { type, title, director, country, date_added, release_year, rating, duration, listed_in, description, service } = req.body;

        // this creates the new media
        const media = new Media({ 
            type, 
            title, 
            director, 
            country, 
            date_added, 
            release_year, 
            rating, 
            duration, 
            listed_in, 
            description,
            service
        });
        await media.save();
        res.status(201).json({ message: `\"${title}\" added successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Your media could not be added.' });
    }
});

// reading the media
app.get('/all', async (req, res) => {
    try {
        const media = await Media.find();
        res.status(200).json(media);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// reading the media
app.get('/allNetflix', async (req, res) => {
    try {
        const media = await Media.find({});
        res.status(200).json(media);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});