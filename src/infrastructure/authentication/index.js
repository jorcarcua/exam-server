 const config = require('../../../config').authentication
 const BaseError = require('../http/errors/BaseError')

 
module.exports = {
    authMiddleware: require('./AuthMiddleware')({config}),
    ensureAuthenticated: require('./EnsureAuthenticated')({BaseError}),
    login: require('./Login'), 
    generateToken : require('./GenerateToken')({config}),
    generateHash : require('./GenerateHash')({config})
}