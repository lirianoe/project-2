const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const app = require("../app");
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
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            console.log("These are RES locals", res.locals)
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

    router.get('/change-info', (req, res, next) => {
        res.render('changeInfo')
    })

    router.post('/change-info', (req, res, next) => {

        if(!req.body.username && !req.body.password) {
            res.render('changeInfo', {errorMessage: "All fields are required"})
            return
        }
        else{
        User.findByIdAndUpdate(req.session.user._id, {
            username: req.body.username,
            password: bcryptjs.hashSync(req.body.password)
        },
        {new: true}
        )
        .then((updatedInfo) => {
            console.log("Changed info:", updatedInfo)
            req.session.user = updatedInfo
            res.redirect('/auth/account')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    })

    router.get('/account', (req, res, next) => {
        res.render('account')
        //console.log(err)
    })

    router.post('/delete', (req, res, next) => {
        User.findById(req.session.user._id)
        .then((foundUser) => {
            foundUser.delete()
            req.session.destroy()
            res.redirect('/auth/signup')
        })
        .catch((err) => {
            console.log(err)
        })
    })

    router.get('/logout', (req, res, nexr) => {
        req.session.destroy()
        res.render('login', {errorMessage: "You have logged out"})
    })



    module.exports = router;