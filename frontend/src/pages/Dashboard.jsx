import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }
        const payload = JSON.parse(atob(token.split('.')[1]))
        setRole(payload.role)
    }, [])

    return (
    <div>
        {role === 'student' && (
            <div>
                <h2>Student Dashboard</h2>
                <a href='/courses'>View Courses</a>
                <a href='/enrolled'>My Enrolled Courses</a>
            </div>
        )}
        {role === 'teacher' && (
            <div>
                <h2>Teacher Dashboard</h2>
                <a href='/courses'>View Courses</a>
            </div>
        )}
        {role === 'admin' && (
            <div>
                <h2>Admin Dashboard</h2>
                <a href='/courses'>View Courses</a>
            </div>
        )}
    </div>
)
}

export default Dashboard