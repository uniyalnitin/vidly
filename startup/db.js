const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('connected to mongodb'))
}


