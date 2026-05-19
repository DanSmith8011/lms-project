import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdMenuBook, MdAddCircle, MdPeople, MdSchool } from 'react-icons/md'

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
    }, [navigate])

return (
    <div style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px'
    }}>
        {role === 'student' && (
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2>Student Dashboard</h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>Welcome back! What would you like to do today?</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href='/courses'><button style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MdMenuBook /> View Courses</button></a>
                    <a href='/enrolled'><button style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MdSchool /> My Enrolled Courses</button></a>
                </div>
            </div>
        )}
        {role === 'teacher' && (
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2>Teacher Dashboard</h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>Manage your courses here.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href='/courses'><button style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MdMenuBook /> View Courses</button></a>
                    <a href='/createCourse'><button style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MdAddCircle /> Create Course</button></a>
                </div>
            </div>
        )}
        {role === 'admin' && (
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2>Admin Dashboard</h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>Manage the platform here.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href='/courses'><button style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MdMenuBook /> View Courses</button></a>
                    <a href='/AdminUsers'><button style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MdPeople /> Manage Users</button></a>
                    <a href='/createCourse'><button style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MdAddCircle /> Create Course</button></a>
                </div>
            </div>
        )}
    </div>
)
}

export default Dashboard