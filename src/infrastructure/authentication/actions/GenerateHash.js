const bcrypt = require('bcrypt')

module.exports = ({config}) => (password) => {
    return hash = bcrypt.hashSync(password, parseInt(config.BCRYPT_ROUNDS));
}