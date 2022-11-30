const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  description: { type: String },
  imageUrl: { type: String },
  name: { type: String },
  price: { type: Number},
  size: {
    type: [String],
    enum: ['XS', 'S', 'M', 'L', 'XL'],
    default: ['S', 'M', 'L']
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
