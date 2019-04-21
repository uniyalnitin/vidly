const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold : Boolean,
    name : {
        type : String,
        required : true,
        minlength: 5,
        maxlength : 50
    },
    phone : {
        type : Number,
    }
});

const Customer = new mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const customerSchema = {
        name : Joi.string().min(5).max(50).required(),
        isGold : Joi.boolean(),
        phone: Joi.number()
    };
    return Joi.validate(customer, customerSchema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;