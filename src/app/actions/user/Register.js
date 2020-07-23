const BaseError = require('../../../infrastructure/http/errors/BaseError')

 
module.exports = ({auth_actions, userRepository}) => async (newUser) => {
    //validate input
    //TODO: use a validator 
    let registerdUser = {}
    if(!newUser.username || !newUser.password){
        throw(new BaseError(400,'username or password not provided',true))
    }
    //check user not exists
    const existentUser = await userRepository.findUser({username: newUser.username}) 

        if(existentUser){ 
            throw(new BaseError(200, 'user already exists', true))
        }
        else{ 
            console.log('entra en no')

            //generate hash
            const hash = auth_actions.generateHash(newUser.password)
            //persist user
            let userToCreate = {
                username: newUser.username,
                password: hash
            }  
            registeredUser = await userRepository.createUser(userToCreate) 
 
        }
       
        return registeredUser 
}