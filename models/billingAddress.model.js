const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billingAddressSchema = new Schema({
    username: String,
    password: String
})

const BillingAddress = mongoose.model('BillingAddress', billingAddressSchema)

module.exports = BillingAddress;