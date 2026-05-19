import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdLogin } from 'react-icons/md'


function Login(){
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
    username,
    password
})
localStorage.setItem('access', response.data.access)
localStorage.setItem('refresh', response.data.refresh)
navigate('/dashboard')
    } catch (error) {
        alert ('Invalid username or password')
    }
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
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleLogin}>
                <MdLogin /> Login
            </button>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>Don't have an account? <a href='/register'>Register here</a></p>
        </div>
    </div>
)
}
export default Login