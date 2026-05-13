import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EnrolledCourses() {
    const [enrolments, setEnrolments] = useState([])
    const navigate = usenavigate()

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }
        axios.get('http://127.0.0.1:8000/api/enrolment/', {
            headers: { Authorization: `Bearer ${token}` }
    })
    .then(reponse => setEnrolments(reponse.data))
    .catch(error => console.log(error))
}, [])

return (
    <div>
        <h2>My Enrolled Courses</h2>
        {enrolments.length == 0 && <p>Yu are not enrolld in any courses yet</p>}
        {enrolments.map(enrolment => (
            <div key={enrolment.id}>
                <h3>{enrolment.course}</h3>
                    <p>Enrolled on: {new Date(enrolment.enrolled_at).toLocaleDateString()}</p>
            </div>
        ))}
    </div>
)
}

export default EnrolledCourses