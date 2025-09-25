import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginThunk } from '../redux/slices/authSlice'
import { trimOrEmpty } from '../utils/sanitize'

export default function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const emailSan = trimOrEmpty(email)
    const passSan = trimOrEmpty(password)
    if (!emailSan || !passSan) return alert('Email and password are required')
    dispatch(loginThunk({ email: emailSan, password: passSan }))
  }

  return (
    <div className="max-w-sm mx-auto py-8">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded p-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  )
}


