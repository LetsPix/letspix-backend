// requirements
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public')) // this will use the index.html as the default page for now. We will move this to the frontend after testing.

// MongoDB info
const uri = "mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/NetflixDatabase?retryWrites=true&w=majority"	
const collectionName = "NetflixCollection"

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
    description: { type: String, required: true }
})

const Media = mongoose.model('Media', mediaSchema, collectionName);

// create media route
app.post('/create', async (req, res) => {
    try {
      const { type, title, director, country, date_added, release_year, rating, duration, listed_in, description } = req.body;
      const movie = new Media({ 
        type, 
        title, 
        director, 
        country, 
        date_added, 
        release_year, 
        rating, 
        duration, 
        listed_in, 
        description });
      await movie.save();
      res.status(201).json({ message: 'Movie added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  // reading the movies
  app.get('/all', async (req, res) => {
    try {
      const movies = await Media.find();
      res.status(200).json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });