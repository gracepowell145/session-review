import React, {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'


function Register(props) {
    const [inputs, setInput] = useState({ email: '', password: '' })

    const handleLogin = () => {
        const { email, password } = inputs
        axios.post('/auth/register', { email, password }).then(res => {
            props.history.push('/dash')
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log(e.target)
        setInput({ ...inputs, [name]: value })
    }
    return (
        <div className="Register">
            <input onChange={(e) => handleChange(e)} value={inputs.email} name='email' placeholder='email' />
            <input onChange={(e) => handleChange(e)} type='password' value={inputs.password} name='password' placeholder='password' />
            <button onClick={() => handleLogin()}>Register</button>
            <div>
                <p>already have an account?</p>
                <Link to='/'>Login here</Link>
            </div>
        </div>
    );
}

export default Register;