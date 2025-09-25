import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CourseForm from '../components/CourseForm'
import api from '../utils/api'

export default function EditCourse() {
  const { id } = useParams()
  const [initial, setInitial] = useState(null)
  useEffect(() => {
    api.get(`/public/courses/${id}`).then(res => setInitial(res.data.course)).catch(() => {})
  }, [id])
  const onSubmit = async (values) => {
    await api.put(`/courses/${id}`, values)
    window.location.href = '/instructor'
  }
  if (!initial) return <div className="p-4">Loading...</div>
  return (
    <div className="py-6 max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Edit Course</h1>
      <CourseForm initial={initial} onSubmit={onSubmit} submitLabel="Save" />
    </div>
  )
}


