import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupThunk } from '../redux/slices/authSlice'
import { trimOrEmpty } from '../utils/sanitize'

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')

  const onSubmit = async (e) => {
    e.preventDefault()
    const n = trimOrEmpty(name)
    const em = trimOrEmpty(email)
    const pw = trimOrEmpty(password)
    if (n.length < 2) return alert('Name must be at least 2 chars')
    if (!em.includes('@')) return alert('Valid email required')
    if (pw.length < 6) return alert('Password must be at least 6 chars')
    try {
      const res = await dispatch(signupThunk({ name: n, email: em, password: pw, role })).unwrap()
      if (res.user.role === 'instructor') navigate('/instructor')
      else navigate('/student')
    } catch (err) {
      alert(err.message || 'Failed to signup')
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input name="name" type="text" required className="form-input rounded-t-md" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <input name="email" type="email" required className="form-input" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <input name="password" type="password" required className="form-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <select name="role" required className="form-input rounded-b-md" value={role} onChange={e => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


