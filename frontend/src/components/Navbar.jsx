import { useNavigate } from 'react-router-dom'
import { MdDashboard, MdMenuBook, MdLogout } from 'react-icons/md'

function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem('access')

    const handleLogout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/login')
    }

    if (!token) return null

    return (
        <nav style={{
            backgroundColor: '#1a73e8',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h1 style={{ color: 'white', fontSize: '20px' }}>LMS</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: 'white', color: '#1a73e8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MdDashboard /> Dashboard
                </button>
                <button onClick={() => navigate('/courses')} style={{ backgroundColor: 'white', color: '#1a73e8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MdMenuBook /> Courses
                </button>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MdLogout /> Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar