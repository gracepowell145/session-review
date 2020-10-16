import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'

export default function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/dash' component={Dashboard} />
            <Route path='/register' component={Register} />
            <h1>404 page not found</h1>
        </Switch>
    )
}