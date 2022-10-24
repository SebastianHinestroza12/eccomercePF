import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Route } from 'react-router-dom'
import { Loading } from '../Login/User/Login'

function PrivateRoute ({ component, ...args }) {
    <Route 
    component = {withAuthenticationRequired(component, {
        onRedirecting: ()=> <Loading />
    })}
    {...args}
    />

}

export default PrivateRoute