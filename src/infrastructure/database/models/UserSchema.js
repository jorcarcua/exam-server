const mongoose = require('mongoose')
const bcrypt   = require('bcrypt');

const Schema = mongoose.Schema

const UserSchema = new Schema (
    { 
        username:  String,
        password: String
    }
)

UserSchema.methods.verifyPassword = function (password)  { 
   return bcrypt.compareSync(password, this.password) 
    
}

module.exports = mongoose.model('User', UserSchema)