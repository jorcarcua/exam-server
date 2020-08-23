module.exports = {
  server: {
    PORT: process.env.PORT,
  },
  database: {
    DBURL: process.env.DBURL,
  },
  authentication: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
    JWT_LIFETIME: process.env.JWT_LIFETIME,
  },
};
