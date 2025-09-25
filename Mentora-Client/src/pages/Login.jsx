import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginThunk } from '../redux/slices/authSlice'
import { trimOrEmpty } from '../utils/sanitize'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const emailSan = trimOrEmpty(email)
    const passSan = trimOrEmpty(password)
    if (!emailSan || !passSan) return alert('Email and password are required')
    try {
      const res = await dispatch(loginThunk({ email: emailSan, password: passSan })).unwrap()
      if (res.user.role === 'instructor') navigate('/instructor')
      else navigate('/student')
    } catch (err) {
      alert(err.message || 'Failed to login')
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input name="email" type="email" required className="form-input rounded-t-md" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <input name="password" type="password" required className="form-input rounded-b-md" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


