const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const movies = require('./routes/movies');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

if (!config.get('jwtPrivateKey')){
    console.error('Fatal Error: jwtPrivateKey not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('connected to mongodb'))
    .catch(console.log('Error: Cannot connect to mongodb'));
    
app.use(express.json())

app.use('/api/genres',genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port: ${port}`));1111