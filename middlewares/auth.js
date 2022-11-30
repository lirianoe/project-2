const isLoggedIn = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/auth/login')
        return
    }
    next();
}

const isAnon = (req, res, next) => {
    if(req.session.user){
        res.redirect('/home')
        return
    }
    next();
}

module.exports = {
    isLoggedIn,
    isAnon
}