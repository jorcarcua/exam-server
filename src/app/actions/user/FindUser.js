

module.exports = ({userRepository}) => async (filter) => { 
    return await userRepository.findUser(filter)
   
}