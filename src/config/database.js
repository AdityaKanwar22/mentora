const mongoose = require('mongoose');
const { env } = require('./env');

async function connectToDatabase() {
  const mongoUri = env.mongoUri;
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000,
  });
  console.log('MongoDB connected');
}

module.exports = { connectToDatabase };


