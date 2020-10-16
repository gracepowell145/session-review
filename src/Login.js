import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

function Login(props) {
    const [inputs, setInput] = useState({ email: '', password: '' })
    const handleLogin = () => {
        const { email, password } = inputs
        axios.post('/auth/login', { email, password }).then(res => {
            props.history.push('/dash')
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log(e.target)
        setInput({ ...inputs, [name]: value })
    }

    return (
        <div className="Login">
            <input onChange={(e) => handleChange(e)} value={inputs.email} name='email' placeholder='email' />
            <input onChange={(e) => handleChange(e)} type='password' value={inputs.password} name='password' placeholder='password' />
            <button onClick={() => handleLogin()}>Login</button>
            <div>
                <p>Don't have an account?</p>
                <Link to='/register'>Register here</Link>
            </div>
        </div>
    );
}

export default Login;