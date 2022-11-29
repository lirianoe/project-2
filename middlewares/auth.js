const isLoggedIn = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/cart/shopping-cart')
        return
    }
    next();
}

const isAnon = (req, res, next) => {
    if(req.session.user){
        res.redirect('/auth/signup')
        return
    }
    next();
}

module.exports = {
    isLoggedIn,
    isAnon
}