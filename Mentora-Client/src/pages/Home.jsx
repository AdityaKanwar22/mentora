import { useEffect, useState } from 'react'
import api from '../utils/api'
import CourseCard from '../components/CourseCard'

export default function Home() {
  const [items, setItems] = useState([])
  useEffect(() => {
    api.get('/public/courses?limit=6').then(res => setItems(res.data.items)).catch(() => {})
  }, [])
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Latest Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(c => <CourseCard key={c._id} course={c} />)}
      </div>
    </div>
  )
}


