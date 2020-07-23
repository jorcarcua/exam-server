const passport = require('passport')

module.exports = (req, res, callback) => {
    passport.authenticate('local', {session:false}, callback)(req,res)
}