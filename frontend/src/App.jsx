import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CourseList from './pages/CourseList'
import Navbar from './components/Navbar'
import EnrolledCourses from './pages/EnrolledCourse'
import CreateCourse from './pages/CreateCourses'

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/enrolled' element={<EnrolledCourses /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/courses' element={<CourseList />} />
      <Route path='/createCourse' element={<CreateCourse />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App