const User = require('../models/User');
const Course = require('../models/Course');

exports.enroll = async (req, res) => {
  const studentId = req.user.id;
  const { courseId } = req.body;
  const course = await Course.findOne({ _id: courseId, published: true });
  if (!course) return res.status(404).json({ message: 'Course not found or not published' });
  const user = await User.findById(studentId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const already = user.enrolledCourses.some((c) => c.toString() === courseId);
  if (already) return res.status(409).json({ message: 'Already enrolled' });
  user.enrolledCourses.push(course._id);
  if (!user.courseProgress.some((p) => p.course.toString() === courseId)) {
    user.courseProgress.push({ course: course._id, completedVideos: [] });
  }
  await user.save();
  res.status(201).json({ message: 'Enrolled', courseId: course._id });
};

exports.completeLesson = async (req, res) => {
  const studentId = req.user.id;
  const { courseId, videoUrl } = req.body;
  const user = await User.findById(studentId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const enrolled = user.enrolledCourses.some((c) => c.toString() === courseId);
  if (!enrolled) return res.status(403).json({ message: 'Not enrolled in this course' });
  const progress = user.courseProgress.find((p) => p.course.toString() === courseId);
  if (!progress) {
    user.courseProgress.push({ course: courseId, completedVideos: [videoUrl] });
  } else {
    if (!progress.completedVideos.includes(videoUrl)) progress.completedVideos.push(videoUrl);
  }
  await user.save();
  res.json({ message: 'Progress updated' });
};

exports.getProgress = async (req, res) => {
  const studentId = req.user.id;
  const { courseId } = req.params;
  const user = await User.findById(studentId).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  const progress = (user.courseProgress || []).find((p) => String(p.course) === String(courseId));
  res.json({ courseId, completedVideos: progress ? progress.completedVideos : [] });
};


