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

router.get("/:id", isLoggedIn, (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId).then((foundProduct) => {
    cart.add(foundProduct, foundProduct.id);
    req.session.cart = cart;
    console.log(req.session)
    res.redirect("/cart/shopping-cart");
  });
});



router.post('/shipping', (req, res, next) => {

    if(!req.body.firstName || !req.body.lastName || !req.body.streetAddress || !req.body.apt || !req.body.city || !req.body.state || !req.body.zipCode || !req.body.phoneNumber){
        res.render('shipping', {errorMessage: "All fields are required"})
        return
    }
        else {
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
    }
})



router.get('/:id/delete-product', (req, res, next) => {
//DO NOT delete product from database
//find cart in session and remove product from cart items object using product id
console.log(req.session)
const cart = new Cart(req.session.cart ? req.session.cart : {});

cart.remove(req.params.id)
req.session.cart = cart;
res.redirect('/cart/shopping-cart')
})




module.exports = router