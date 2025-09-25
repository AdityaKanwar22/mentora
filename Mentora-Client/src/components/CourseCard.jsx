import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <div className="border rounded p-4 bg-white flex flex-col">
      <div className="font-semibold line-clamp-1">{course.title}</div>
      <div className="text-sm text-gray-600 line-clamp-2 mt-1">{course.description}</div>
      <div className="mt-2 text-sm">Category: {course.category}</div>
      <div className="mt-1 text-sm">Rating: {course.averageRating?.toFixed?.(1) ?? 0} ({course.reviewsCount ?? 0})</div>
      <div className="mt-2 font-medium">${'{'}course.price{'}'}</div>
      <Link to={`/courses/${course._id}`} className="mt-3 text-blue-600 text-sm">View details</Link>
    </div>
  )
}


