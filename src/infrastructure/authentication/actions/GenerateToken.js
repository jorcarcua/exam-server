const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');

module.exports = ({config}) => (user) => {
    console.log('mensaje desde login')
    console.log(config)
    console.log(user)
    const payload = {
        sub: user._id,
        exp: Date.now() + parseInt(config.JWT_LIFETIME),
        username: user.username
        }; 
    const token = jwt.sign(JSON.stringify(payload), config.JWT_SECRET, {algorithm: config.JWT_ALGORITHM});       
    return token          
        
}