import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem('access')
    
    if (!token) {
        return <Navigate to='/login' />
    }

    const payload = JSON.parse(atob(token.split('.')[1]))
    const role = payload.role

    if (!allowedRoles.includes(role)) {
        return <Navigate to='/dashboard' />
    }

    return children
}

export default ProtectedRoute