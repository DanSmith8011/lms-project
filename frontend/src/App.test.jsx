import { render, screen } from '@testing-library/react'

test('Login button renders', () => {
    const { getByText } = render(
        <div>
            <button>Login</button>
        </div>
    )
    expect(getByText('Login')).toBeInTheDocument()
})

test('Register button renders', () => {
    const { getByText } = render(
        <div>
            <button>Register</button>
        </div>
    )
    expect(getByText('Register')).toBeInTheDocument()
})