require('dotenv').config();

module.exports = {
  server: {
    PORT: process.env.PORT,
  },
  database: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  authentication: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
    JWT_LIFETIME: process.env.JWT_LIFETIME,
  },
};
