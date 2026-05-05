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
        <div>
            <h2>Register</h2>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value='student'>Student</option>
                <option value='teacher'>Teacher</option>
            </select>
            <button onClick={handleRegister}>Register</button>
        </div>
    )

}

export default Register