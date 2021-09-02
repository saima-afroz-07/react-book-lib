import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

//this to make route a private route. so basically a 
function PrivateRouter({component: Component, ...rest}) {
    const tempUser = JSON.parse(localStorage.getItem('user'));
    const {currentUser} = useAuth();
    // console.log(currentUser);
    return (
        <Route
            {...rest}
            render={props => {
               return tempUser ? <Component {...props}/> : <Redirect to="/login"/>
            }}
        ></Route>
    );
}

export default PrivateRouter;