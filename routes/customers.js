const auth = require('../middleware/auth');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req,res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Cannot find the Customer with the given id');

    res.send(customer);

});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(`Invalid data format: ${error}`);

    let customer = {
        name : req.body.name,
        isGold : req.body.isGold,
        phone : parseInt(req.body.phone)
    };

    customer = new Customer(customer);

    try{
        await customer.save();
        res.send(customer);
    }
    catch (err){
        res.status(404).send(`Cannot Save into database due to ${ err }`);
    }

});

router.put('/:id', auth, async (req, res) => {
    try{
        const { error } = validate(req.body);
        if(error) return res.status(404).send(error.details[0].message);
    
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name : req.body.name,
            isGold : req.body.isGold,
            phone: parseInt(req.body.phone)
        }, { new : true});

        if(!customer) return res.status(404).send('Customer with given id cannot be found');
        res.send(customer);
    }
    catch (error) {
        console.log('Error: ', error);
        res.status(404).send(error);
    }

});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(404).send('Customer with given id cannot be found');

    res.send(customer)
});

module.exports = router;