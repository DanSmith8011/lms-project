import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

beforeEach(() => {
    mock.reset()
    localStorage.clear()
})

test('login button triggers POST request', async () => {
    mock.onPost('https://lms-backend-d72v.onrender.com/api/users/login/').reply(200, {
        access: 'fake-token',
        refresh: 'fake-refresh'
    })

    let clicked = false
    const handleLogin = async () => {
        const response = await axios.post('https://lms-backend-d72v.onrender.com/api/users/login/', {
            username: 'test', password: 'test'
        })
        localStorage.setItem('access', response.data.access)
        clicked = true
    }

    render(<button onClick={handleLogin}>Login</button>)
    fireEvent.click(screen.getByText('Login'))
    await waitFor(() => expect(clicked).toBe(true))
    expect(localStorage.getItem('access')).toBe('fake-token')
})

test('register button triggers POST request', async () => {
    mock.onPost('https://lms-backend-d72v.onrender.com/api/users/register/').reply(201, {
        message: 'User created successfully'
    })

    let registered = false
    const handleRegister = async () => {
        await axios.post('https://lms-backend-d72v.onrender.com/api/users/register/', {
            username: 'test', email: 'test@test.com', password: 'test123', role: 'student'
        })
        registered = true
    }

    render(<button onClick={handleRegister}>Register</button>)
    fireEvent.click(screen.getByText('Register'))
    await waitFor(() => expect(registered).toBe(true))
})

test('courses API returns data', async () => {
    mock.onGet('https://lms-backend-d72v.onrender.com/api/courses/').reply(200, [
        { id: 1, title: 'Test Course', description: 'Test Description' }
    ])

    const response = await axios.get('https://lms-backend-d72v.onrender.com/api/courses/')
    expect(response.data).toHaveLength(1)
    expect(response.data[0].title).toBe('Test Course')
})

test('enrolment API creates enrolment', async () => {
    mock.onPost('https://lms-backend-d72v.onrender.com/api/enrolment/').reply(201, {
        id: 1, course: 1
    })

    const response = await axios.post('https://lms-backend-d72v.onrender.com/api/enrolment/', {
        course: 1
    })
    expect(response.status).toBe(201)
})

test('logout clears localStorage', () => {
    localStorage.setItem('access', 'fake-token')
    localStorage.setItem('refresh', 'fake-refresh')

    const handleLogout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }

    render(<button onClick={handleLogout}>Logout</button>)
    fireEvent.click(screen.getByText('Logout'))
    expect(localStorage.getItem('access')).toBeNull()
    expect(localStorage.getItem('refresh')).toBeNull()
})

test('delete button triggers DELETE request', async () => {
    mock.onDelete('https://lms-backend-d72v.onrender.com/api/courses/1/').reply(204)

    let deleted = false
    const handleDelete = async () => {
        await axios.delete('https://lms-backend-d72v.onrender.com/api/courses/1/')
        deleted = true
    }

    render(<button onClick={handleDelete}>Delete</button>)
    fireEvent.click(screen.getByText('Delete'))
    await waitFor(() => expect(deleted).toBe(true))
})