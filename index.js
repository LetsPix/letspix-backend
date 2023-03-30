// requirements
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const constants = require('./ConnectionConstants')
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB info
const uri = constants.uri;
const collectionName = constants.collectionName;

// starting up the server using mongoose
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
    cast: { type: String, required: true }, 
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

// Just getting the home page if someone wants to go to the server site for whatever reason 
app.get('/', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});

/* CRUD operations below */

// create media **CREATE**
app.post('/create', async (req, res) => {
    try {
        const { type, title, cast, director, country, date_added, release_year, rating, duration, listed_in, description, service } = req.body;

        // this creates the new media
        const media = new Media({ 
            type,
            title,
            cast,
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

// reading all the media pretaining to Netflix **READ**
app.get('/api/all', async (req, res) => {

    try {
        const media = await Media.find();
        res.status(200).json(media);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Finding a specific media **READ**
app.post('/api/findtitle', async (req, res) => {
    const userTitle = req.body.title;
    try {
        const mediaTitle = await Media.findOne({ title: userTitle});
        res.status(200).json(mediaTitle);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// reading all the media pretaining to Netflix **READ**
app.get('/ping', async (req, res) => {
    res.status(200).json({ message: 'Server pinged'});
});