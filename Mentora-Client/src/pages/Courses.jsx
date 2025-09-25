import { useEffect, useState } from 'react'
import api from '../utils/api'
import CourseCard from '../components/CourseCard'
import CourseFilters from '../components/CourseFilters'

export default function Courses() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState({ q: '', category: '', minPrice: '', maxPrice: '' })

  useEffect(() => {
    const params = new URLSearchParams({ limit: 12 })
    if (query.q) params.set('q', query.q)
    if (query.category) params.set('category', query.category)
    if (query.minPrice) params.set('minPrice', query.minPrice)
    if (query.maxPrice) params.set('maxPrice', query.maxPrice)
    api.get(`/public/courses?${params.toString()}`).then(res => setItems(res.data.items)).catch(() => {})
  }, [query])

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-4">Courses</h2>
      <CourseFilters onChange={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(c => (<CourseCard key={c._id} course={c} />))}
      </div>
    </div>
  )
}


