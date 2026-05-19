import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EnrolledCourses() {
    const [enrolments, setEnrolments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }
        axios.get('https://lms-backend-d72v.onrender.com/api/enrolment/', {
            headers: { Authorization: `Bearer ${token}` }
    })
    .then(reponse => setEnrolments(reponse.data))
    .catch(error => console.log(error))
}, [navigate])

return (
    <div style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px'
    }}>
        <h2>My Enrolled Courses</h2>
        {enrolments.length === 0 && (
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                textAlign: 'center',
                color: '#666'
            }}>
                <p>You are not enrolled in any courses yet.</p>
            </div>
        )}
        {enrolments.map(enrolment => (
            <div key={enrolment.id} style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '15px'
            }}>
                <h3 style={{ marginBottom: '10px' }}>Course ID: {enrolment.course}</h3>
                <p style={{ color: '#666' }}>Enrolled on: {new Date(enrolment.enrolled_at).toLocaleDateString()}</p>
            </div>
        ))}
    </div>
)
}

export default EnrolledCourses