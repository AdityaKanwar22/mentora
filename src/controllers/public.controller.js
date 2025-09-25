const Course = require('../models/Course');
const User = require('../models/User');
const Review = require('../models/Review');

exports.listCourses = async (req, res) => {
  const { page = 1, limit = 10, q, category, minPrice, maxPrice } = req.query;
  const filter = { published: true };
  if (q) {
    filter.$or = [
      { title: { $regex: String(q), $options: 'i' } },
      { description: { $regex: String(q), $options: 'i' } },
      { category: { $regex: String(q), $options: 'i' } },
    ];
  }
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);

  const pageNum = Number(page) || 1;
  const limitNum = Math.min(Number(limit) || 10, 100);
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    Course.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('owner', 'name email')
      .lean(),
    Course.countDocuments(filter),
  ]);

  res.json({ items, total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) });
};

exports.getCourseDetail = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOne({ _id: id, published: true })
    .populate('owner', 'name email')
    .lean();
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const [reviews, stats] = await Promise.all([
    Review.find({ course: id }).populate('student', 'name').lean(),
    Review.aggregate([
      { $match: { course: course._id } },
      { $group: { _id: '$course', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]),
  ]);
  const rating = stats[0] ? { average: stats[0].avgRating, count: stats[0].count } : { average: 0, count: 0 };

  res.json({ course, reviews, rating });
};


