import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function InstructorCourses() {
  const [items, setItems] = useState([])

  const load = () => {
    api.get('/courses/mine').then(res => setItems(res.data.items)).catch(() => {})
  }

  useEffect(() => { load() }, [])

  const onDelete = async (id) => {
    if (!confirm('Delete this course?')) return
    await api.delete(`/courses/${id}`)
    load()
  }

  const togglePublish = async (id, published) => {
    await api.post(`/courses/${id}/${published ? 'unpublish' : 'publish'}`)
    load()
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">My Courses</h1>
        <a href="/instructor/new" className="bg-blue-600 text-white px-3 py-2 rounded text-sm">Add Course</a>
      </div>
      <div className="space-y-3">
        {items.map(c => (
          <div key={c._id} className="border rounded p-4 bg-white">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-gray-600">{c.category} • ${'{'}c.price{'}'}</div>
            <div className="mt-2 flex gap-2">
              <a href={`/instructor/edit/${c._id}`} className="text-blue-600 text-sm">Edit</a>
              <button onClick={() => onDelete(c._id)} className="text-red-600 text-sm">Delete</button>
              <button onClick={() => togglePublish(c._id, c.published)} className="text-sm">{c.published ? 'Unpublish' : 'Publish'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


