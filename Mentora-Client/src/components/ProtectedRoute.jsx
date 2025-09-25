import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { accessToken } = useSelector(s => s.auth)
  const location = useLocation()
  if (!accessToken) return <Navigate to="/login" replace state={{ from: location }} />
  return children
}


