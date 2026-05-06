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
            {role === 'student' && <h2>Student Dashboard</h2>}
            {role === 'teacher' && <h2>Teacher Dashboard</h2>}
            {role === 'admin' && <h2>Admin Dashboard</h2>}
        </div>
    )
}

export default Dashboard