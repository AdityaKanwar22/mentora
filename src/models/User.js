const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { env } = require('../config/env');

const refreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
      required: true,
    },
    refreshTokens: { type: [refreshTokenSchema], default: [] },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: [] }],
    courseProgress: {
      type: [
        new mongoose.Schema(
          {
            course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
            completedVideos: { type: [String], default: [] },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(env.bcryptSaltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;


