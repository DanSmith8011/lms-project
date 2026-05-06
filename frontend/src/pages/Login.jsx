import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
    <div>
        <label>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <a href='/register'>Register here</a></p>
    </div>
)
}
export default Login