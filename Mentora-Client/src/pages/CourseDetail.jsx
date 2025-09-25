import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../utils/api'

export default function CourseDetail() {
  const { id } = useParams()
  const { user } = useSelector(s => s.auth)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [enrolled, setEnrolled] = useState(false)
  const [myReview, setMyReview] = useState(null)
  const [ratingValue, setRatingValue] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get(`/public/courses/${id}`).then(res => {
      setData(res.data)
      setError('')
    }).catch(() => setError('Failed to load')).finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    // detect enrollment (200 => enrolled)
    if (user) {
      api.get(`/student/progress/${id}`).then(() => setEnrolled(true)).catch(() => setEnrolled(false))
    } else {
      setEnrolled(false)
    }
  }, [user, id])

  useEffect(() => {
    if (!data || !user) { setMyReview(null); return }
    const mine = (data.reviews || []).find(r => r.student && r.student._id === user.id)
    setMyReview(mine || null)
    if (mine) {
      setRatingValue(mine.rating)
      setComment(mine.comment || '')
    } else {
      setRatingValue(5)
      setComment('')
    }
  }, [data, user])

  const onEnroll = async () => {
    try {
      await api.post('/student/enroll', { courseId: id })
      alert('Enrolled!')
      setEnrolled(true)
    } catch (_) {
      alert('Failed to enroll')
    }
  }

  const submitReview = async () => {
    if (Number(ratingValue) < 1 || Number(ratingValue) > 5) return alert('Rating must be 1-5')
    if (comment.length > 1000) return alert('Comment too long')
    try {
      if (myReview) {
        await api.put(`/reviews/${myReview._id}`, { rating: Number(ratingValue), comment })
      } else {
        await api.post('/reviews', { courseId: id, rating: Number(ratingValue), comment })
      }
      const res = await api.get(`/public/courses/${id}`)
      setData(res.data)
    } catch (_) {
      alert('Failed to submit review')
    }
  }

  const deleteReview = async () => {
    if (!myReview) return
    if (!confirm('Delete your review?')) return
    try {
      await api.delete(`/reviews/${myReview._id}`)
      const res = await api.get(`/public/courses/${id}`)
      setData(res.data)
      setMyReview(null)
      setRatingValue(5)
      setComment('')
    } catch (_) {
      alert('Failed to delete review')
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error || !data) return <div className="p-4">{error || 'Not found'}</div>

  const { course, reviews, rating } = data

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <div className="text-gray-700 mt-2">{course.description}</div>
      <div className="mt-2">Category: {course.category} • Price: ${'{'}course.price{'}'}</div>
      <div className="mt-2">Rating: {rating.average?.toFixed?.(1) ?? 0} ({rating.count ?? 0})</div>
      <div className="mt-2 text-sm">Instructor: {course.owner?.name}</div>

      {Array.isArray(course.videos) && course.videos.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Lessons</h2>
          <ul className="list-disc pl-5 text-sm">
            {course.videos.map((v) => (<li key={v}>{v}</li>))}
          </ul>
        </div>
      )}

      {user && (user.role === 'student' || user.role === 'admin') && !enrolled && (
        <button onClick={onEnroll} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Enroll</button>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
        {enrolled && (user?.role === 'student' || user?.role === 'admin') && (
          <div className="mb-4 border rounded p-3 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm">Your rating</label>
              <input type="number" min={1} max={5} value={ratingValue} onChange={e=>setRatingValue(e.target.value)} className="border rounded p-1 w-16" />
            </div>
            <textarea className="w-full border rounded p-2" rows={3} placeholder="Write a review (optional)" value={comment} onChange={e=>setComment(e.target.value)} />
            <div className="mt-2 flex gap-2">
              <button onClick={submitReview} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">{myReview ? 'Update Review' : 'Submit Review'}</button>
              {myReview && <button onClick={deleteReview} className="text-red-600 text-sm">Delete</button>}
            </div>
          </div>
        )}
        {reviews.length === 0 ? (
          <div className="text-sm text-gray-600">No reviews yet.</div>
        ) : (
          <div className="space-y-3">
            {reviews.map(r => (
              <div key={r._id} className="border rounded p-3 bg-white">
                <div className="text-sm font-medium">{r.student?.name}</div>
                <div className="text-sm">Rating: {r.rating}</div>
                {r.comment && <div className="text-sm text-gray-700 mt-1">{r.comment}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


