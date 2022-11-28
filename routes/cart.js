var express = require("express");
var router = express.Router();
var Product = require("../models/product.model");
var Cart = require("../models/cart.model");

router.get('/shopping-cart', (req, res, next) => {
    
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart.generateArray())
    res.render('cart' , { cart: cart.generateArray(), totalPrice: cart.totalPrice })
})

router.get("/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId).then((foundProduct) => {
    cart.add(foundProduct, foundProduct.id);
    req.session.cart = cart;
    console.log(req.session)
    res.redirect("/home");
  });
});

router.get('/checkout', (req, res, next) => {
    res.render()
})

module.exports = router