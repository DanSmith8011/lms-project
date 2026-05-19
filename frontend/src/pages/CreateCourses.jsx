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
            await axios.post('https://lms-backend-d72v.onrender.com/api/courses/', {
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
    <div style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px'
    }}>
        <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginBottom: '20px' }}>Create New Course</h2>
            <input 
                type='text' 
                placeholder='Course Title' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <input 
                type='text' 
                placeholder='Course Description' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <button 
                style={{ width: '100%', marginTop: '10px' }} 
                onClick={handleSubmit}>
                Create Course
            </button>
        </div>
    </div>
)

}

export default CreateCourse
