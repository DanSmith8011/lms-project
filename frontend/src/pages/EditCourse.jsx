import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditCourse() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const token = localStorage.getItem('access')
        axios.get(`https://lms-backend-d72v.onrender.com/api/courses/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setTitle(response.data.title)
            setDescription(response.data.description)
        })
        .catch(error => console.log(error))
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('access')
        try {
            await axios.put(`https://lms-backend-d72v.onrender.com/api/courses/${id}/`, {
                title,
                description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Course updated successfully!')
            navigate('/courses')
        } catch (error) {
            alert('Failed to update course')
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
                <h2 style={{ marginBottom: '20px' }}>Edit Course</h2>
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
                    type="button"
                    style={{ width: '100%', marginTop: '10px' }}
                    onClick={handleSubmit}>
                    Update Course
                </button>
            </div>
        </div>
    )
}

export default EditCourse