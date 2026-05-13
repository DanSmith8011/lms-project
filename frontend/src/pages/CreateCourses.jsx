import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateCourse() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('access')
        try {
            await axios.post('http://127.0.0.1:8000/api/courses/', {
                title,
                description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Course created successfully!')
            navigate('/courses')
        } catch (error) {
            alert('Failed to create course')
        }
    }

    return (
        <div>
            <h2>Create Course</h2>
            <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSubmit}>Create Course</button>
        </div>
    )
}

export default CreateCourse
