import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Private Route for logged in users when they want to visit the login page will redirect to the admin page
export const PrivateRoute = ({ component: Component, ...prop }) => (
    <Route {...prop} render={props => {

        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            return <Redirect to={{ pathname: '/login' }} />
        }

        return <Component {...props} />
    }} />
)