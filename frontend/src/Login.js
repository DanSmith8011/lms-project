import { useState } from 'react'

function Login(){
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

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