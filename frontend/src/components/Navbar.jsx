import { useNavigate } from 'react-router-dom'

function Navbar(){ 
    const navigate = useNavigate()
    const token = localStorage.getItem('access')

    const handleLogout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/login')
    }

if (!token) return null

    return (
        <nav>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button> 
            <button onClick={() => navigate('/courses')}>Courses</button> 
            <button onClick={handleLogout}>logout</button> 
        </nav>
    )
}

export default Navbar 