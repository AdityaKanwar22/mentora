import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Courses from './Courses'
import Login from './Login'
import Signup from './Signup'
import CourseDetail from './CourseDetail'
import ProtectedRoute from '../components/ProtectedRoute'
import RoleRoute from '../components/RoleRoute'
import { useDispatch } from 'react-redux'
import { logoutThunk } from '../redux/slices/authSlice'
import InstructorCourses from './InstructorCourses'
import NewCourse from './NewCourse'
import EditCourse from './EditCourse'

export default function App() {
  const dispatch = useDispatch()
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-4 items-center">
          <Link to="/" className="font-semibold">Mentora</Link>
          <Link to="/courses" className="text-sm">Courses</Link>
          <div className="ml-auto">
            <Link to="/signup" className="text-sm mr-3">Signup</Link>
            <Link to="/login" className="text-sm mr-3">Login</Link>
            <button onClick={() => dispatch(logoutThunk())} className="text-sm">Logout</button>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<ProtectedRoute><RoleRoute roles={["student","admin"]}><div>Student Dashboard</div></RoleRoute></ProtectedRoute>} />
          <Route path="/instructor" element={<ProtectedRoute><RoleRoute roles={["instructor","admin"]}><InstructorCourses /></RoleRoute></ProtectedRoute>} />
          <Route path="/instructor/new" element={<ProtectedRoute><RoleRoute roles={["instructor","admin"]}><NewCourse /></RoleRoute></ProtectedRoute>} />
          <Route path="/instructor/edit/:id" element={<ProtectedRoute><RoleRoute roles={["instructor","admin"]}><EditCourse /></RoleRoute></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}


