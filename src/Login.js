import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Login(props) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/auth/user').then(_ => props.history.push('/dash'))
            .catch(_ => setLoading(true))
        return setLoading(false)
    }, [])

    const [inputs, setInput] = useState({ email: '', password: '' })

    const handleLogin = () => {
        const { email, password } = inputs
        axios.post('/auth/login', { email, password })
            .then(_ => props.history.push('/dash'))
            .catch(_ => alert('incorrect email or password'))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({ ...inputs, [name]: value })
    }
    return (
        <div>
            {loading && <div className="Login">
                <input
                    onChange={(e) => handleChange(e)}
                    value={inputs.email}
                    name='email'
                    placeholder='email'
                />
                <input
                    onChange={(e) =>
                        handleChange(e)}
                    type='password'
                    value={inputs.password}
                    name='password'
                    placeholder='password'
                />
                <button onClick={() => handleLogin()}>Login</button>
                <div>
                    <p>Don't have an account?</p>
                    <Link to='/register'>Register here</Link>
                </div>
            </div>
            }
        </div>
    );
}