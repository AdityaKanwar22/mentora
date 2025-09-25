const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const ownerId = req.user.id;
  const course = await Course.create({ ...req.body, owner: ownerId });
  return res.status(201).json({ course });
};

exports.updateCourse = async (req, res) => {
  const ownerId = req.user.id;
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (course.owner.toString() !== ownerId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  Object.assign(course, req.body);
  await course.save();
  return res.json({ course });
};

exports.deleteCourse = async (req, res) => {
  const ownerId = req.user.id;
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (course.owner.toString() !== ownerId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  await course.deleteOne();
  return res.json({ message: 'Course deleted' });
};

exports.publishCourse = async (req, res) => {
  const ownerId = req.user.id;
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (course.owner.toString() !== ownerId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  course.published = true;
  await course.save();
  return res.json({ course });
};

exports.unpublishCourse = async (req, res) => {
  const ownerId = req.user.id;
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (course.owner.toString() !== ownerId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  course.published = false;
  await course.save();
  return res.json({ course });
};

exports.listMyCourses = async (req, res) => {
  const ownerId = req.user.id;
  const items = await (await require('../models/Course').find({ owner: ownerId }).sort({ createdAt: -1 })).map?.(c=>c) || await require('../models/Course').find({ owner: ownerId }).sort({ createdAt: -1 });
  return res.json({ items });
};


