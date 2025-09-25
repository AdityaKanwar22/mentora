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
    <div className="py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Our Courses</h1>
        <p className="text-lg text-gray-600 mb-8">Find the perfect course for you.</p>
      </div>
      <CourseFilters onChange={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(c => (<CourseCard key={c._id} course={c} />))}
      </div>
    </div>
  )
}


