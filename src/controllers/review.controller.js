const Review = require('../models/Review');
const Course = require('../models/Course');

async function recomputeCourseRating(courseId) {
  const stats = await Review.aggregate([
    { $match: { course: new (require('mongoose').Types.ObjectId)(courseId) } },
    { $group: { _id: '$course', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  const averageRating = stats[0] ? Number(stats[0].avg.toFixed(2)) : 0;
  const reviewsCount = stats[0] ? stats[0].count : 0;
  await Course.findByIdAndUpdate(courseId, { averageRating, reviewsCount });
}

exports.create = async (req, res) => {
  const studentId = req.user.id;
  const { courseId, rating, comment } = req.body;
  const exists = await Review.findOne({ course: courseId, student: studentId });
  if (exists) return res.status(409).json({ message: 'You already reviewed this course' });
  const review = await Review.create({ course: courseId, student: studentId, rating, comment });
  await recomputeCourseRating(courseId);
  res.status(201).json({ review });
};

exports.update = async (req, res) => {
  const studentId = req.user.id;
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.student.toString() !== studentId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  if (typeof req.body.rating !== 'undefined') review.rating = req.body.rating;
  if (typeof req.body.comment !== 'undefined') review.comment = req.body.comment;
  await review.save();
  await recomputeCourseRating(review.course);
  res.json({ review });
};

exports.remove = async (req, res) => {
  const studentId = req.user.id;
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.student.toString() !== studentId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const courseId = review.course;
  await review.deleteOne();
  await recomputeCourseRating(courseId);
  res.json({ message: 'Review deleted' });
};


