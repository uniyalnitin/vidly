const auth = require('../middleware/auth');
const {Movie , validate} = require('../models/movie');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('Cannot find movie with given id');

    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send('Invalid genre...');
    
        const movie = new Movie({
            title : req.body.title,
            genre : {
                _id: genre._id,
                name : genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
        });
    
        await movie.save();
        res.send(movie);
    }
    catch(error) {
        console.log(error);
        res.status(404).send(error)
    }
});

router.put('/:id', auth, async (req, res) => {
    try{
        const { error } = validate(req.body);
        if(error) return res.status(404).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return req.status(400).send('Invalid genre...');

        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title : req.body.title,
            genre : {
                _id: genre._id,
                name: genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
        },
        {
            new : true
        });

        if (!movie) res.status(404).send('Cannot find the movie with given id');

        res.send(movie);
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Error: ', error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try{
        const movie = await Movie.findByIdAndRemove(req.params.id,{ new: true});
        if (!movie) return res.status(404).send('Cannot find the movie with given id');

        res.send(movie);
    }
    catch(error){
        console.log(error);
        res.status(404).send(error)
    }
});

module.exports = router;