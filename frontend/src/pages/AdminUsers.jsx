import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminUsers() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }
        axios.get('http://127.0.0.1:8000/api/users/all-users/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    }, [navigate])

   return (
    <div style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px'
    }}>
        <h2>User Management</h2>
        {users.map(user => (
            <div key={user.id} style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h3 style={{ marginBottom: '5px' }}>{user.username}</h3>
                    <p style={{ color: '#666', fontSize: '14px' }}>{user.email}</p>
                </div>
                <span style={{
                    backgroundColor: '#1a73e8',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '12px'
                }}>{user.role}</span>
            </div>
        ))}
    </div>
)
}

export default AdminUsers
