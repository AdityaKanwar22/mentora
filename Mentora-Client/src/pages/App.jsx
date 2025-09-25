import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Courses from './Courses'
import Login from './Login'
import Signup from './Signup'
import CourseDetail from './CourseDetail'
import ProtectedRoute from '../components/ProtectedRoute'
import RoleRoute from '../components/RoleRoute'
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '../redux/slices/authSlice'
import InstructorCourses from './InstructorCourses'
import NewCourse from './NewCourse'
import EditCourse from './EditCourse'

export default function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="font-bold text-xl">Mentora</Link>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/courses" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Courses</Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <>
                  {user.role === 'instructor' && <Link to="/instructor" className="text-sm font-medium text-gray-700 hover:text-gray-900">Instructor</Link>}
                  {user.role === 'student' && <Link to="/student" className="text-sm font-medium text-gray-700 hover:text-gray-900">Dashboard</Link>}
                  <button onClick={() => dispatch(logoutThunk())} className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">Login</Link>
                  <Link to="/signup" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Signup</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
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


