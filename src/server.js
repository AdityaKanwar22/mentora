const app = require('./app');
const { connectToDatabase } = require('./config/database');

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Mentora server listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});


