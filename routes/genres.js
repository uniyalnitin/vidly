const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('Cannot find the genre with given id');

    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    
    try{
        const { error } = validate(req.body);
        if (error) return res.status(404).send(error.details[0].message);

        const genre = new Genre({
            name : req.body.name
        });
        await genre.save()
        res.send(genre);
    }
    catch(err) {
        console.log('Error', err);
    }
});

router.put('/:id', auth, async (req, res)=> {
    try{
        const { error } = validate(req.body);
        if(error) return res.status(404).send('Invlid data');
        
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(404).send('Cannot find the genre with the given id');

        genre.name = req.body.name;
        genre.save();
        res.send(genre);
    }
    catch (err){
        console.log(err);
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove({_id: req.params.id });

    if (!genre) return res.status(404).send('The genre with given id not found');

    res.send(genre);
});

module.exports = router;