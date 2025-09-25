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
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <input className="border rounded p-2 flex-1 min-w-[200px]" placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
      <input className="border rounded p-2 w-40" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input className="border rounded p-2 w-28" placeholder="Min price" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      <input className="border rounded p-2 w-28" placeholder="Max price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
    </div>
  )
}


