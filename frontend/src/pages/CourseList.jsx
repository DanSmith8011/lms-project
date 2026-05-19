import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdSchool } from 'react-icons/md'

function CourseList() {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }
        axios.get('http://127.0.0.1:8000/api/courses/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setCourses(response.data))
        .catch(error => console.log(error))
    }, [navigate])

    const handleEnrol = async (courseId) => {
        const token = localStorage.getItem('access')
        try {
            await axios.post('http://127.0.0.1:8000/api/enrolment/', {
                course: courseId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Successfully enrolled!')
        } catch (error) {
            alert('Already enrolled or error occurred')
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
                <button onClick={() => handleEnrol(course.id)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <MdSchool /> Enrol
</button>
            </div>
        ))}
    </div>
)
}

export default CourseList