const BaseError = require('./../../http/errors/BaseError')
const config = require('../../../../config').authentication
const {checkCredentials, findUser} = require('../../../app/actions')



module.exports = {
    authMiddleware: require('./AuthMiddleware')({config, checkCredentials, findUser}),
    ensureAuthenticated: require('./EnsureAuthenticated')({BaseError})
}