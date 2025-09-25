import { useState } from 'react'

export default function CourseForm({ initial = {}, onSubmit, submitLabel = 'Save' }) {
  const [title, setTitle] = useState(initial.title ?? '')
  const [description, setDescription] = useState(initial.description ?? '')
  const [price, setPrice] = useState(initial.price ?? '')
  const [category, setCategory] = useState(initial.category ?? '')
  const [thumbnail, setThumbnail] = useState(initial.thumbnail ?? '')
  const [videos, setVideos] = useState((initial.videos ?? []).join('\n'))
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!title || title.length < 3) e.title = 'Title must be at least 3 chars'
    if (!description || description.length < 10) e.description = 'Description must be at least 10 chars'
    if (!price || isNaN(Number(price)) || Number(price) < 0) e.price = 'Price must be >= 0'
    if (!category) e.category = 'Category required'
    try { new URL(thumbnail) } catch { e.thumbnail = 'Thumbnail must be a URL' }
    const videosArr = videos.split('\n').map(v=>v.trim()).filter(Boolean)
    for (const v of videosArr) { try { new URL(v) } catch { e.videos = 'All videos must be URLs'; break } }
    setErrors(e)
    return { ok: Object.keys(e).length === 0, videosArr }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { ok, videosArr } = validate()
    if (!ok) return
    onSubmit({ title, description, price: Number(price), category, thumbnail, videos: videosArr })
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
      <textarea className="w-full border rounded p-2" rows={4} placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
      <input className="w-full border rounded p-2" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
      {errors.category && <div className="text-red-600 text-sm">{errors.category}</div>}
      <input className="w-full border rounded p-2" placeholder="Thumbnail URL" value={thumbnail} onChange={e=>setThumbnail(e.target.value)} />
      {errors.thumbnail && <div className="text-red-600 text-sm">{errors.thumbnail}</div>}
      <input className="w-full border rounded p-2" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
      {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
      <textarea className="w-full border rounded p-2" rows={6} placeholder="Video URLs (one per line)" value={videos} onChange={e=>setVideos(e.target.value)} />
      {errors.videos && <div className="text-red-600 text-sm">{errors.videos}</div>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">{submitLabel}</button>
    </form>
  )
}


