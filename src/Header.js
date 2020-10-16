import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

const Header = (props) => {
    const logout = () => {
        axios.delete('/auth/logout').then(_ => props.history.push('/'))
    }
    return(
        <div>
            <p>header</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default withRouter(Header)