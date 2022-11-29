const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shippingSchema = new Schema({
    firstName: String,
    lastName: String,
    streetAddress: String,
    apt: String,
    city: String,
    state: String,
    zipCode: String,
    phoneNumber: String
})

const Shipping = mongoose.model('Shipping', shippingSchema)

module.exports = Shipping;