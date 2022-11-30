var express = require("express");
var router = express.Router();
var Product = require("../models/product.model");
var Cart = require("../models/cart.model");
var Shipping = require("../models/shipping.model")
const { isLoggedIn, isAnon } = require('../middlewares/auth')


router.get('/shopping-cart', isLoggedIn, (req, res, next) => {
    
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart.generateArray())
    res.render('cart' , { cart: cart.generateArray(), totalPrice: cart.totalPrice })
})
router.get('/:id/edit-cart', isLoggedIn, (req, res, next) => {
    
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const thisItem = cart.generateArray().filter((item) => item._id == req.params.id)
    console.log(cart.generateArray())

    console.log("THIS IS THE ITEM", req.session.cart.items[req.params.id])
    res.render('edit-cart.hbs' , { thisItem: req.session.cart.items[req.params.id]})
})

router.get('/shipping', (req, res, next) => {
    res.render('shipping')
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



router.post('/shipping', (req, res, next) => {
    Shipping.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    apt: req.body.apt,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber
    })
    .then(() => {
        res.render('checkout')
    })
    .catch((err) => {
        res.send(err)
    })
})



router.get('/:id/delete-product', (req, res, next) => {
//DO NOT delete product from database
//find cart in session and remove product from cart items object using product id
console.log(req.session)
delete req.session.cart.items[req.params.id]
res.redirect('/cart/shopping-cart')
})




module.exports = router