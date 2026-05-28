import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminUsers() {
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)
    const [editForm, setEditForm] = useState({ username: '', email: '', role: '' })
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (!token) {
            navigate('/login')
            return
        }
        axios.get('https://lms-backend-d72v.onrender.com/api/users/all-users/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    }, [navigate])

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return
        const token = localStorage.getItem('access')
        try {
            await axios.delete(`https://lms-backend-d72v.onrender.com/api/users/all-users/${userId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUsers(users.filter(user => user.id !== userId))
            alert('User deleted successfully!')
        } catch (error) {
            alert('Failed to delete user')
        }
    }

    const handleEdit = (user) => {
        setEditingUser(user.id)
        setEditForm({ username: user.username, email: user.email, role: user.role })
    }

    const handleUpdate = async (userId) => {
        const token = localStorage.getItem('access')
        try {
            await axios.put(`https://lms-backend-d72v.onrender.com/api/users/all-users/${userId}/`, editForm, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUsers(users.map(user => user.id === userId ? { ...user, ...editForm } : user))
            setEditingUser(null)
            alert('User updated successfully!')
        } catch (error) {
            alert('Failed to update user')
        }
    }

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h2>User Management</h2>
            {users.map(user => (
                <div key={user.id} style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    marginBottom: '15px'
                }}>
                    {editingUser === user.id ? (
                        <div>
                            <input value={editForm.username} onChange={(e) => setEditForm({...editForm, username: e.target.value})} placeholder='Username' />
                            <input value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} placeholder='Email' />
                            <select value={editForm.role} onChange={(e) => setEditForm({...editForm, role: e.target.value})}>
                                <option value='student'>Student</option>
                                <option value='teacher'>Teacher</option>
                                <option value='admin'>Admin</option>
                            </select>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => handleUpdate(user.id)}>Save</button>
                                <button type="button" onClick={() => setEditingUser(null)} style={{ backgroundColor: '#666' }}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ marginBottom: '5px' }}>{user.username}</h3>
                                <p style={{ color: '#666', fontSize: '14px' }}>{user.email}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <span style={{ backgroundColor: '#1a73e8', color: 'white', padding: '5px 10px', borderRadius: '20px', fontSize: '12px' }}>{user.role}</span>
                                <button type="button" onClick={() => handleEdit(user)} style={{ backgroundColor: '#f0a500', color: 'white' }}>Edit</button>
                                <button type="button" onClick={() => handleDelete(user.id)} style={{ backgroundColor: '#e53935', color: 'white' }}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AdminUsers