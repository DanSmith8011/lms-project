import { useState } from 'react'



function Login(){
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleLogin = async (e) {
    e.preventDefualt()
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
    username,
    password
})
    }
}
return (
    <div>
        <label>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
    </div>
)
}
export default Login