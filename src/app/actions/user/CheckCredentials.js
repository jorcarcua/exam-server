const BaseError = require("../../../infrastructure/http/errors/BaseError");


module.exports = ({userRepository}) => async (username, password) => {
      let result = false
      const user = await userRepository.findUser({ username: username});
      if(!user){ throw new BaseError(401, 'user not exists', true)} 
      if(!userRepository.verifyPassword(user, password)){
          throw new BaseError(410, 'username or password not correct', true)
      } 
      else{
          result = user
      }    
      return result
}