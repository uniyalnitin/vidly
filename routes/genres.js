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

router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if (error) return res.status(404).send('Invalid data');

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

router.put('/:id', async (req, res)=> {
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

router.delete('/:id', async (req, res) => {
    const result = await Genre.deleteOne({_id: req.params.id })
    res.send(result);
});

module.exports = router;