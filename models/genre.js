const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
    }
});

const Genre = new mongoose.model('Genre', genreSchema);


function validateGenre(genre){
    const genreSchema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(genre, genreSchema);   
};

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;