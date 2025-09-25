import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signupThunk } from '../redux/slices/authSlice'
import { trimOrEmpty } from '../utils/sanitize'

export default function Signup() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')

  const onSubmit = (e) => {
    e.preventDefault()
    const n = trimOrEmpty(name)
    const em = trimOrEmpty(email)
    const pw = trimOrEmpty(password)
    if (n.length < 2) return alert('Name must be at least 2 chars')
    if (!em.includes('@')) return alert('Valid email required')
    if (pw.length < 6) return alert('Password must be at least 6 chars')
    dispatch(signupThunk({ name: n, email: em, password: pw, role }))
  }

  return (
    <div className="max-w-sm mx-auto py-8">
      <h1 className="text-xl font-semibold mb-4">Signup</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded p-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select className="w-full border rounded p-2" value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Create account</button>
      </form>
    </div>
  )
}


