import React from 'react';
import Header from './Header/Header';
import Body from './Body/Body';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Information from './Body/Information';
import UpdateData from './Body/UpdateData/UpdateData';
import { SelectedOptionsProvider } from './Body/UpdateData/SelectedOptionsContext';
import LoginPage from './LoginPage/LoginPage';

const Main = () => {
    return (
        <SelectedOptionsProvider>
            <Router>
                <Header />
                <Switch>
                    <Route path='/Main/Information'><Information /></Route>
                    <Route path='/Main/UpdateData'><UpdateData /></Route>
                    <Route path='/Login'><LoginPage /></Route>
                    <Route path='/Main'><Body /></Route>
                </Switch>
            </Router>
        </SelectedOptionsProvider>
    );
};

export default Main;