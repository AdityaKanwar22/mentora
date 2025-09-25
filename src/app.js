const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { loadEnv } = require('./config/env');
const errorHandler = require('./middlewares/error');

loadEnv();

const app = express();

app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const healthRouter = require('./routes/health.routes');
const authRouter = require('./routes/auth.routes');
const courseRouter = require('./routes/course.routes');
const publicRouter = require('./routes/public.routes');
const studentRouter = require('./routes/student.routes');
const reviewRouter = require('./routes/review.routes');

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRouter);
app.use('/api/public', publicRouter);
app.use('/api/student', studentRouter);
app.use('/api/reviews', reviewRouter);

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;


