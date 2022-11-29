const router = require("express").Router();
const bcryptjs = require('bcryptjs')
const User = require('../models/user.model')


router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    if (!req.body.username || !req.body.password){
        res.render('login', {errorMessage: "All fields are required"})
        return;
    }


    User.findOne({username: req.body.username})
        .then((foundUser) => {
            if (!foundUser){
                res.render('login', {errorMessage: "This User does not exist"})
            } else {
                let correctPassword = bcryptjs.compareSync(req.body.password, foundUser.password);
                if(correctPassword) {
                    req.session.user = foundUser;
                    res.redirect('/home')
                } else {
                    res.render('login', {errorMessage: "Incorrect Password or Username"})
                }
            }
        })
    })


    router.get('/signup', (req, res, next) => {
        res.render('signup')
    })

    router.post('/signup', (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            res.render('signup', {errorMessage: "Sorry, you forgot username or password"})
            return
        }

        User.findOne({ username: req.body.username})
            .then(foundUser => {
                if (foundUser) {
                    res.render('signup.hbs', { errorMessage: "Sorry user already exists" })
                    return;
                }
                return User.create({
                    username: req.body.username,
                    password: bcryptjs.hashSync(req.body.password)
                })
            })

            .then(createdUser => {
                console.log('here is the new user', createdUser);
                res.redirect('login')
            })

            .catch(err => {
                res.render(err)
            })
    })

    router.get('/logout', (req, res, nexr) => {
        req.session.destroy()
        res.render('login', {errorMessage: "You have logged out"})
    })



    module.exports = router;