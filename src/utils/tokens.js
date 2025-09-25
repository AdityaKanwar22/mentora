const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function signAccessToken(payload) {
  return jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtAccessExpiresIn });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtAccessSecret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwtRefreshSecret);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};


