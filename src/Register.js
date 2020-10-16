import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Register(props) {
    const [inputs, setInput] = useState({ email: '', password: '' })

    const handleRegister = () => {
        const { email, password } = inputs
        axios.post('/auth/register', { email, password })
            .then(_ => props.history.push('/dash'))
            .catch(err => alert('email or password is incorrect'))
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({ ...inputs, [name]: value })
    }
    return (
        <div className="Register">
            <input onChange={(e) => handleChange(e)} value={inputs.email} name='email' placeholder='email' />
            <input onChange={(e) => handleChange(e)} type='password' value={inputs.password} name='password' placeholder='password' />
            <button onClick={() => handleRegister()}>Register</button>
            <div>
                <p>already have an account?</p>
                <Link to='/'>Login here</Link>
            </div>
        </div>
    );
}