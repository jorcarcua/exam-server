

module.exports = ({auth_actions}) => (req, res, callback) => { 
    return auth_actions.authenticate(req, res, (error, user) => { 
        if (error || !user) {  
            callback(error, null)    
        }else {
            const token = auth_actions.generateToken(user)
            const result = {
                user,
                token
            } 
            callback (null, result)
        }
     });
}