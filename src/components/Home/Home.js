import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Signup from '../Signup';
import Login from '../Login'
import Dashboard from '../Dashboard';
import PrivateRouter from '../PrivateRouter/PrivateRouter';
import BookList from '../BookList/BookList';
import Profile from '../Profile/Profile';

function Home(props) {
    return (
        <Router>
            <Switch>
                <PrivateRouter exact path="/dashboard" component={Dashboard}/>
                <PrivateRouter path="/user-details" component={Profile}/>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login}/>
                <PrivateRouter path="/book-list" component={BookList}/>
            </Switch>
        </Router>
    );
}

export default Home;