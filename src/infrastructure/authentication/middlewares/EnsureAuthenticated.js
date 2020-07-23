
const passport          = require('passport');
 
 
module.exports = ({BaseError}) => (req,res,next) => { 
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{   
        if (info) {  
            return next(new BaseError(401, info.toString(), true))  }
         
        if (err) { 
            return next(err) }  
        if (!user) { return next(new BaseError(401, 'no valid token provided', true)) }
        console.log('mete el user en el request')
        console.log(user)
        req.user = user
        next()
    })(req, res, next);
}