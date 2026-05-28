import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CourseList from './pages/CourseList'
import Navbar from './components/Navbar'
import EnrolledCourses from './pages/EnrolledCourse'
import CreateCourse from './pages/CreateCourses'
import AdminUsers from './pages/AdminUsers'
import EditCourse from './pages/EditCourse'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/enrolled' element={
          <ProtectedRoute allowedRoles={['student']}>
            <EnrolledCourses />
          </ProtectedRoute>
        } />
        <Route path='/createCourse' element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <CreateCourse />
          </ProtectedRoute>
        } />
        <Route path='/AdminUsers' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path='/editCourse/:id' element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <EditCourse />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App