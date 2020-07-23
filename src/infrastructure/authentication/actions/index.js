const config = require('../../../../config').authentication

module.exports = {
 generateHash: require('./GenerateHash')({config}),
 generateToken: require('./GenerateToken')({config}),
 authenticate: require('./Authenticate')
}