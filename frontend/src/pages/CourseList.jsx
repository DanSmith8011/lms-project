import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdSchool } from 'react-icons/md'

function CourseList() {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    const token = localStorage.getItem('access')
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : {}
    const role = payload.role

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }
        axios.get('https://lms-backend-d72v.onrender.com/api/courses/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setCourses(response.data))
        .catch(error => console.log(error))
    }, [navigate])

    const handleEnrol = async (courseId) => {
        const token = localStorage.getItem('access')
        try {
            await axios.post('https://lms-backend-d72v.onrender.com/api/enrolment/', {
                course: courseId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Successfully enrolled!')
        } catch (error) {
            alert('Already enrolled or error occurred')
        }
    }

    const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return
    const token = localStorage.getItem('access')
    try {
        await axios.delete(`https://lms-backend-d72v.onrender.com/api/courses/${courseId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setCourses(courses.filter(course => course.id !== courseId))
        alert('Course deleted successfully!')
    } catch (error) {
        alert('Failed to delete course')
    }
}

return (
    <div style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px'
    }}>
        <h2>Available Courses</h2>
        {courses.map(course => (
            <div key={course.id} style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '15px'
            }}>
                <h3 style={{ marginBottom: '10px' }}>{course.title}</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>{course.description}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {role === 'student' && (
                        <button type="button" onClick={() => handleEnrol(course.id)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <MdSchool /> Enrol
                        </button>
                    )}
                    {(role === 'teacher' || role === 'admin') && (
                        <>
                            <button type="button" onClick={() => navigate(`/editCourse/${course.id}`)} style={{ backgroundColor: '#f0a500', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
                                Edit
                            </button>
                            <button type="button" onClick={() => handleDelete(course.id)} style={{ backgroundColor: '#e53935', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        ))}
    </div>
)
}

export default CourseList