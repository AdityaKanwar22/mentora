import { useState, useEffect } from 'react'

export default function CourseFilters({ onChange, initial }) {
  const [q, setQ] = useState(initial?.q ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [minPrice, setMinPrice] = useState(initial?.minPrice ?? '')
  const [maxPrice, setMaxPrice] = useState(initial?.maxPrice ?? '')

  useEffect(() => {
    const t = setTimeout(() => onChange({ q, category, minPrice, maxPrice }), 300)
    return () => clearTimeout(t)
  }, [q, category, minPrice, maxPrice])

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input className="form-input" placeholder="Search by keyword" value={q} onChange={e => setQ(e.target.value)} />
        <input className="form-input" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="number" className="form-input" placeholder="Min price" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        <input type="number" className="form-input" placeholder="Max price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>
    </div>
  )
}


