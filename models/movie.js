const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength: 5,
        maxlength: 255,
    },
    genre : {
        type: genreSchema,
        required: true
    },
    numberInStock :{
        type : Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate : {
        type : Number, 
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = new mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    schema = {
        title : Joi.string().min(5).max(255).required(),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number(),
        dailyRentalRate : Joi.number()
    };
    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;