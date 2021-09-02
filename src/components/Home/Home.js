import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Signup from '../Signup';
import Login from '../Login'
import Dashboard from '../Dashboard';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

function Home(props) {
    return (
        <>
        <Router>
            <Switch>
            <PrivateRouter exact path="/dashboard" component={Dashboard}/>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login}/>
            </Switch>
        </Router>
        </>
    );
}

export default Home;