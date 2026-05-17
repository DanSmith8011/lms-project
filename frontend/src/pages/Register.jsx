import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')
    
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/api/users/register/', {
                username,
                email,
                password,
                role
            })
            alert('Registration successful! Please login.')
         } catch (error) {
            alert('Registration failed. Please try again.') }
    }

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8'
    }}>
        <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value='student'>Student</option>
                <option value='teacher'>Teacher</option>
            </select>
            <button style={{ width: '100%', marginTop: '10px' }} onClick={handleRegister}>Register</button>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>Already have an account? <a href='/login'>Login here</a></p>
        </div>
    </div>
)
}

export default Register