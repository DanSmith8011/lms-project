import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
    }, [])

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
        <div>
            <h2>Available Courses</h2>
            {courses.map(course => (
                <div key={course.id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button onClick={() => handleEnrol(course.id)}>Enrol</button>
                </div>
            ))}
        </div>
    )
}

export default CourseList