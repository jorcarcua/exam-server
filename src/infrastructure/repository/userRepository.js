module.exports = ({ UserModel }) => ({
  findUser: async (filter) => {
    return UserModel.findOne(filter).exec();
  },

  verifyPassword: (user, password) => {
    return user.verifyPassword(password);
  },

  createUser: async (user) => {
    const newUser = new UserModel(user);
    return newUser.save();
  },

  existsUsername: async (username) => {
    let result = false;
    const user = await UserModel.findOne({ username }).exec();
    if (user) {
      result = true;
    }
    return result;
  },
});
