import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import CourseCard from '../components/CourseCard'

export default function Home() {
  const [items, setItems] = useState([])
  useEffect(() => {
    api.get('/public/courses?limit=6').then(res => setItems(res.data.items)).catch(() => {})
  }, [])
  return (
    <>
      <div className="bg-indigo-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to Mentora</h1>
        <p className="text-xl mb-8">Your journey to knowledge starts here.</p>
        <Link to="/courses" className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-full hover:bg-indigo-100">Explore Courses</Link>
      </div>
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map(c => <CourseCard key={c._id} course={c} />)}
        </div>
      </div>
    </>
  )
}


