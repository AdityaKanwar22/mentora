const dotenv = require('dotenv');

function loadEnv() {
  const result = dotenv.config();
  if (result.error && process.env.NODE_ENV !== 'production') {
    console.warn('No .env file found, proceeding with environment variables only');
  }
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mentora',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'change_this_access_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change_this_refresh_secret',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  cookieSecure: process.env.COOKIE_SECURE === 'true',
};

module.exports = { loadEnv, env };


