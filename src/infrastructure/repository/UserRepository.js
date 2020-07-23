

module.exports = ({userModel}) => ({
        findUser: async (filter) => {  
            return await userModel.findOne(filter).exec()
        },

        verifyPassword: (user, password) => { 
            return user.verifyPassword(password)
        },
        
        createUser: async (user) => {
            const newUser = new userModel (user)
            return await newUser.save();  
        }
})