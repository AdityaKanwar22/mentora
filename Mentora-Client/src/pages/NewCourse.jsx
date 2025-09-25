import CourseForm from '../components/CourseForm'
import api from '../utils/api'

export default function NewCourse() {
  const onSubmit = async (values) => {
    await api.post('/courses', values)
    window.location.href = '/instructor'
  }
  return (
    <div className="py-6 max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Create Course</h1>
      <CourseForm onSubmit={onSubmit} submitLabel="Create" />
    </div>
  )
}


