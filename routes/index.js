var express = require("express");
var router = express.Router();
var Product = require("../models/product.model");
const Cart = require("../models/cart.model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/home", (req, res, next) => {
  Product.find()
    .then((foundProducts) => {
      res.render("home", { foundProducts });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .then((foundProduct) => {
      res.render("product-detail", { foundProduct });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get('/aboutUs', (req, res, next) => {
  res.render('about-us')
})

router.get('/contact', (req, res, next) => {
  res.render('contact')
})



module.exports = router;
