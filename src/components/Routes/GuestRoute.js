import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Guest Route for users who have not logged in when they want to visit the admin page will redirect to the login page
export const GuestRoute = ({ component: Component, ...prop }) => (
    <Route {...prop} render={(props) => {

        const token = JSON.parse(localStorage.getItem('token'));

        if (token) {
            return <Redirect to={{ pathname: '/admin' }} />
        }

        return <Component {...props} />
    }} />

)